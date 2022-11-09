#ifndef CAFF_PARSER_GIF_WRITER_HPP
#define CAFF_PARSER_GIF_WRITER_HPP


#include "gif.h"

void writeToFile(const std::vector<CaffAnimation>& animations, const char* output_file) {
    GifWriter gw;
    if(!animations.empty())
    {
        CiffData ciff = animations.at(0).ciff;
        long long first_width = ciff.width;
        long long first_height = ciff.height;
        long long first_duration = animations.at(0).duration / 10;
        GifBegin(&gw, output_file, first_width, first_height, first_duration);
    }

    for (const auto & animation : animations) {
        CiffData ciff = animation.ciff;
        uint32_t duration = animation.duration / 10;
        GifWriteFrame(&gw, ciff.pixels.data(), ciff.width, ciff.height, duration);
    }

    GifEnd(&gw);
}
#endif //CAFF_PARSER_GIF_WRITER_HPP
