#ifndef HF2_CAFF_CREDITS_H
#define HF2_CAFF_CREDITS_H

#include <vector>
#include <string>

struct CaffCredits {
    long long year;
    long long month;
    long long day;
    long long hour;
    long long minute;
    long long creator_len;
    std::string creator;
};


#endif //HF2_CAFF_CREDITS_H
