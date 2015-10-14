//
//  H102Wrapper.m
//  tsog
//
//  Created by Stefan Nguyen on 9/4/15.
//
//
#import "H102Wrapper.h"

@implementation H102Wrapper
+ (void)countlyStart:(NSString *)appKey withUrl:(NSString *)hostUrl {
//    [[Countly sharedInstance] start:appKey withHost:hostUrl];
}

+ (void)countlyRecordEvent:(NSString *)key count:(NSNumber *)count {
//    [[Countly sharedInstance] recordEvent:key count:[count intValue]];
}

+ (void)openScheme:(NSString *)bundleId withData:(NSString *)data {
  NSURL *theURL = [NSURL URLWithString:[NSString stringWithFormat:@"%@://%@", bundleId, data]];
  if ([[UIApplication sharedApplication] canOpenURL:theURL])
    [[UIApplication sharedApplication] openURL:theURL];
  else
    NSLog(@"Receiver not found");
}

+ (void)showMessage:(NSString *)title message:(NSString *)message {
  UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title
                                                      message:message
                                                     delegate:nil
                                            cancelButtonTitle:@"OK"
                                            otherButtonTitles:nil];
  
  [alertView show];
}

@end
