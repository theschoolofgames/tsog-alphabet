//
//  AnalyticManager.hpp
//  tsog-alphabet
//
//  Created by Thuy Dong Xuan on 10/12/15.
//
//

#ifndef AnalyticManager_hpp
#define AnalyticManager_hpp

#include "cocos2d.h"

class AnalyticManager
{
  static cocos2d::ValueMap data;
  
public:
  
  static void createEvent();
  static void setEventString(std::string key, std::string value);
  static void setEventInt(std::string key, int value);
  static void setEventFloat(std::string key, float value);
  static void sendEvent();
  
  static void registerCountly();
};

#endif /* AnalyticManager_hpp */
