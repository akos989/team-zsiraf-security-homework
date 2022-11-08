#include <vector>
#include <iostream>
#include <fstream>
#include "caff_header/caff_header.h"
#include "constants/constants.hpp"
#include "caff_credits/caff_credits.h"
#include "caff_animation/caff_animation.h"
#include "block_info.h"
#include "caff_handler.hpp"
#include "output_generation/gif_writer.hpp"


long long CaffHandler::readBytesAsLongLong(long long start, long long length) {
    long long result = 0, bytepos = 0;
    for (long long i = start; i < start + length; ++i) {
        result += rawCaffData.at(i) << (8 * bytepos);
        ++bytepos;
    }
    return result;
}

std::string CaffHandler::readBytesAsString(long long start, long long length) {
    std::string result;
    for (long long i = start; i < start + length; ++i) {
        result += (char) rawCaffData.at(i);
    }
    return result;
}

bool CaffHandler::isCaffMagicValid(long long start) {
    return (rawCaffData.at(start) == 'C' && rawCaffData.at(start + 1) == 'A' && rawCaffData.at(start + 2) == 'F' &&
            rawCaffData.at(start + 3) == 'F');
}

bool CaffHandler::isCiffMagicValid(long long start) {
    return (rawCaffData.at(start) == 'C' && rawCaffData.at(start + 1) == 'I' && rawCaffData.at(start + 2) == 'F' &&
            rawCaffData.at(start + 3) == 'F');
}

CiffData CaffHandler::createCiffDataFromBytes(long long start) {
    if(!isCiffMagicValid(start))
    {
        std::cerr << "Ciff magic not valid!" << std::endl;
        throw "error parsing ciff";
    }

    CiffData ciff;
    ciff.header_size = readBytesAsLongLong(start + MAGIC_LENGTH, HEADER_SIZE_LENGTH);
    ciff.content_size = readBytesAsLongLong(start + MAGIC_LENGTH + HEADER_SIZE_LENGTH, CONTENT_SIZE_LENGTH);
    ciff.width = readBytesAsLongLong(start + MAGIC_LENGTH + HEADER_SIZE_LENGTH + CONTENT_SIZE_LENGTH, WIDTH_LENGTH);
    ciff.height = readBytesAsLongLong(start + MAGIC_LENGTH + HEADER_SIZE_LENGTH + CONTENT_SIZE_LENGTH + WIDTH_LENGTH,
                                       HEIGHT_LENGTH);

    int caption_start =
            (int) start + MAGIC_LENGTH + HEADER_SIZE_LENGTH + CONTENT_SIZE_LENGTH + WIDTH_LENGTH + HEIGHT_LENGTH;
    int tag_start = caption_start;

    std::string caption;
    for (int i = caption_start; rawCaffData.at(i) != 0x0A; ++i) {
        caption += rawCaffData.at(i);
        ++tag_start;
    }

    ciff.caption = caption;

    std::string tag;
    for (int i = tag_start; i < start + ciff.header_size; ++i) {
        if (rawCaffData.at(i) != '\0' || rawCaffData.at(i) != '\n') {
            tag += rawCaffData.at(i);
        } else {
            ciff.tags.push_back(tag);
            tag = "";
        }
    }

    long long pic_start = start + ciff.header_size;
    std::vector<uint8_t> pic;
    int alpha = 2;
    for (long long int i = pic_start; i < pic_start + ciff.content_size; i++) {
        if (alpha == 2) {
            alpha = 0;
        }
        else {
            alpha++;
        }
        pic.push_back(rawCaffData.at(i));
        if (alpha == 2) {
            pic.push_back(int8_t(255));
        }
    }
    ciff.pixels = pic;
    return ciff;

}

CaffHeader CaffHandler::createHeaderFromBytes(long long start) {
    if(!isCaffMagicValid(start))
    {
        std::cerr << "Caff magic not valid!" << std::endl;
        throw "error parsing header";
    }

    CaffHeader new_header{};
    new_header.header_size = readBytesAsLongLong(start + MAGIC_LENGTH, HEADER_SIZE_LENGTH);
    new_header.num_anim = readBytesAsLongLong(start + MAGIC_LENGTH + HEADER_SIZE_LENGTH, NUM_ANIM_LENGTH);

    return new_header;
}

CaffCredits CaffHandler::createCreditsFromBytes(long long start) {
    CaffCredits new_credits;
    new_credits.year = readBytesAsLongLong(start, YEAR_LENGTH);
    new_credits.month = readBytesAsLongLong(start + YEAR_LENGTH, MONTH_LENGTH);
    new_credits.day = readBytesAsLongLong(start + YEAR_LENGTH + MONTH_LENGTH, DAY_LENGTH);
    new_credits.hour = readBytesAsLongLong(start + YEAR_LENGTH + MONTH_LENGTH + DAY_LENGTH, HOUR_LENGTH);
    new_credits.minute = readBytesAsLongLong(start + YEAR_LENGTH + MONTH_LENGTH + DAY_LENGTH + HOUR_LENGTH,
                                              MINUTE_LENGTH);

    new_credits.creator_len = readBytesAsLongLong(
            start + YEAR_LENGTH + MONTH_LENGTH + DAY_LENGTH + HOUR_LENGTH + MINUTE_LENGTH, CREATOR_LEN_LENGTH);
    new_credits.creator = readBytesAsString(
            start + YEAR_LENGTH + MONTH_LENGTH + DAY_LENGTH + HOUR_LENGTH + MINUTE_LENGTH + CREATOR_LEN_LENGTH,
            new_credits.creator_len);

    return new_credits;
}

CaffAnimation CaffHandler::createAnimationFromBytes(long long start) {
    CaffAnimation new_animation;
    new_animation.duration = readBytesAsLongLong(start, DURATION_LENGTH);
    new_animation.ciff = createCiffDataFromBytes(start + DURATION_LENGTH);

    return new_animation;
}

BlockInfo CaffHandler::createBlockInfoFromBytes(long long start) {
    BlockInfo blockInfo{};
    int blockId = (int)rawCaffData.at(start);
    long long length = readBytesAsLongLong(start + BLOCK_ID_LENGTH, BLOCK_LENGTH_LENGTH);

    blockInfo.type_id = blockId;
    blockInfo.length = length;

    return blockInfo;
}

void CaffHandler::readBlock(long long start) {
    BlockInfo blockInfo = createBlockInfoFromBytes(start);

    switch (blockInfo.type_id) {
        case 1:
            header = createHeaderFromBytes(start + BLOCK_ID_LENGTH + BLOCK_LENGTH_LENGTH);
            break;
        case 2:
            credits = createCreditsFromBytes(start + BLOCK_ID_LENGTH + BLOCK_LENGTH_LENGTH);
            break;
        case 3:
            animations.push_back(createAnimationFromBytes(start + BLOCK_ID_LENGTH + BLOCK_LENGTH_LENGTH));
            ++parsedAnimations;            break;
        default:
            std::cerr << "Error parsing block header" << std::endl;
            throw "error parsing block header";

    }
    readPos += BLOCK_ID_LENGTH + BLOCK_LENGTH_LENGTH + blockInfo.length;

}

void CaffHandler::parseCaff(std::string filename) {
    std::ifstream stream(filename, std::ios::in | std::ios::binary);

    rawCaffData = std::vector<uint8_t>(std::istreambuf_iterator<char>(stream), std::istreambuf_iterator<char>());

    long long fileSize = rawCaffData.size();
    do {
        readBlock(readPos);

    } while (readPos < fileSize);

    if (rawCaffData.empty())
    {
        throw "error CAFF has 0 frames!";
    }
    if (parsedAnimations != header.num_anim) {
        throw "error num_anim does not match ciff animations parsed";
    }

    writeToFile(animations, "output.gif");
}
