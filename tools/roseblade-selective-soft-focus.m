#import <Foundation/Foundation.h>
#import <CoreGraphics/CoreGraphics.h>
#import <CoreImage/CoreImage.h>
#import <ImageIO/ImageIO.h>
#import <UniformTypeIdentifiers/UniformTypeIdentifiers.h>

static CGRect RectFromTop(CGFloat x, CGFloat y, CGFloat width, CGFloat height, CGFloat canvasHeight) {
  return CGRectMake(x, canvasHeight - y - height, width, height);
}

static CGPoint PointFromTop(CGFloat x, CGFloat y, CGFloat canvasHeight) {
  return CGPointMake(x, canvasHeight - y);
}

int main(int argc, const char *argv[]) {
  @autoreleasepool {
    if (argc != 3) {
      fprintf(stderr, "Usage: roseblade-selective-soft-focus <input.jpg> <output.jpg>\n");
      return 64;
    }

    NSURL *inputURL = [NSURL fileURLWithPath:[NSString stringWithUTF8String:argv[1]]];
    NSURL *outputURL = [NSURL fileURLWithPath:[NSString stringWithUTF8String:argv[2]]];
    CIImage *source = [CIImage imageWithContentsOfURL:inputURL];
    if (!source) {
      fprintf(stderr, "Could not read the source image.\n");
      return 65;
    }

    CGRect extent = source.extent;
    size_t width = (size_t)CGRectGetWidth(extent);
    size_t height = (size_t)CGRectGetHeight(extent);
    if (width != 2048 || height != 1311) {
      fprintf(stderr, "Unexpected source dimensions: %zux%zu\n", width, height);
      return 66;
    }

    size_t bytesPerRow = width;
    unsigned char *pixels = calloc(height, bytesPerRow);
    if (!pixels) return 70;

    CGColorSpaceRef gray = CGColorSpaceCreateDeviceGray();
    CGContextRef maskContext = CGBitmapContextCreate(
      pixels, width, height, 8, bytesPerRow, gray, (CGBitmapInfo)kCGImageAlphaNone
    );
    CGColorSpaceRelease(gray);
    if (!maskContext) {
      free(pixels);
      return 70;
    }

    CGContextSetGrayFillColor(maskContext, 0.0, 1.0);
    CGContextFillRect(maskContext, CGRectMake(0, 0, width, height));

    // Soft-focus only the broad, low-detail regions behind long-form text.
    CGContextSetGrayFillColor(maskContext, 1.0, 1.0);
    CGContextFillRect(maskContext, RectFromTop(330, 160, 500, 1030, height));
    CGContextFillRect(maskContext, RectFromTop(720, 110, 390, 430, height));
    CGContextFillRect(maskContext, RectFromTop(1160, 790, 410, 390, height));

    // Keep the roses, stems, garter, hand, and knife optically untouched.
    CGContextSetGrayFillColor(maskContext, 0.0, 1.0);
    CGContextFillEllipseInRect(maskContext, RectFromTop(735, 535, 500, 505, height));
    CGContextFillEllipseInRect(maskContext, RectFromTop(1060, 245, 440, 415, height));

    CGPoint knifePoints[] = {
      PointFromTop(1015, 350, height),
      PointFromTop(1175, 385, height),
      PointFromTop(1690, 755, height),
      PointFromTop(1605, 835, height),
      PointFromTop(1080, 540, height),
    };
    CGContextBeginPath(maskContext);
    CGContextMoveToPoint(maskContext, knifePoints[0].x, knifePoints[0].y);
    for (NSUInteger index = 1; index < sizeof(knifePoints) / sizeof(knifePoints[0]); index++) {
      CGContextAddLineToPoint(maskContext, knifePoints[index].x, knifePoints[index].y);
    }
    CGContextClosePath(maskContext);
    CGContextFillPath(maskContext);

    CGImageRef maskCG = CGBitmapContextCreateImage(maskContext);
    CGContextRelease(maskContext);
    free(pixels);
    if (!maskCG) return 70;

    CIImage *mask = [[CIImage imageWithCGImage:maskCG] imageByCroppingToRect:extent];
    CGImageRelease(maskCG);

    CIFilter *feather = [CIFilter filterWithName:@"CIGaussianBlur"];
    [feather setValue:mask forKey:kCIInputImageKey];
    [feather setValue:@26.0 forKey:kCIInputRadiusKey];
    CIImage *featheredMask = [[feather valueForKey:kCIOutputImageKey] imageByCroppingToRect:extent];

    CIFilter *softFocus = [CIFilter filterWithName:@"CIMaskedVariableBlur"];
    if (!softFocus) {
      fprintf(stderr, "CIMaskedVariableBlur is unavailable.\n");
      return 69;
    }
    [softFocus setValue:source forKey:kCIInputImageKey];
    [softFocus setValue:@2.6 forKey:kCIInputRadiusKey];
    [softFocus setValue:featheredMask forKey:@"inputMask"];
    CIImage *result = [[softFocus valueForKey:kCIOutputImageKey] imageByCroppingToRect:extent];
    if (!result) {
      fprintf(stderr, "Could not build filtered image.\n");
      return 69;
    }

    CIContext *context = [CIContext contextWithOptions:nil];
    CGImageRef outputCG = [context createCGImage:result fromRect:extent];
    if (!outputCG) {
      fprintf(stderr, "Could not render output image.\n");
      return 74;
    }
    CGImageDestinationRef destination = CGImageDestinationCreateWithURL(
      (__bridge CFURLRef)outputURL, (__bridge CFStringRef)UTTypeJPEG.identifier, 1, NULL
    );
    if (!destination) {
      CGImageRelease(outputCG);
      fprintf(stderr, "Could not create JPEG destination.\n");
      return 74;
    }
    NSDictionary *properties = @{
      (__bridge NSString *)kCGImageDestinationLossyCompressionQuality: @0.96,
    };
    CGImageDestinationAddImage(destination, outputCG, (__bridge CFDictionaryRef)properties);
    BOOL wrote = CGImageDestinationFinalize(destination);
    CFRelease(destination);
    CGImageRelease(outputCG);
    if (!wrote) {
      fprintf(stderr, "Could not finalize output image.\n");
      return 74;
    }
  }
  return 0;
}
