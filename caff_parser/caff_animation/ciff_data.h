#ifndef HF2_CIFF_DATA_H
#define HF2_CIFF_DATA_H

#include <string>
#include <vector>

struct CiffData{
    long long header_size;
    long long content_size;
    long long width;
    long long height;
    std::string caption;
    std::vector<std::string> tags;
    std::vector<uint8_t> pixels;

};

#endif //HF2_CIFF_DATA_H
