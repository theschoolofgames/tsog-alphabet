//
//  AnalyticManager.cpp
//  tsog-alphabet
//
//  Created by Thuy Dong Xuan on 10/12/15.
//
//

#include "AnalyticManager.h"

USING_NS_CC;
using namespace std;

ValueMap AnalyticManager::data = ValueMapNull;

void AnalyticManager::createEvent() {
  data = ValueMap();
}

void AnalyticManager::setEventString(std::string key, std::string value) {
  data.insert({{key, Value(value)}});
}

void AnalyticManager::setEventInt(std::string key, int value) {
  data.insert({{key, Value(value)}});
}

void AnalyticManager::setEventFloat(std::string key, float value) {
  data.insert({{key, Value(value)}});
}
