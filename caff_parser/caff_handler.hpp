#ifndef HF2_CAFF_HANDLER_HPP
#define HF2_CAFF_HANDLER_HPP

class CaffHandler {
private:
    long long readPos = 0;
    long long parsedAnimations = 0;
    bool isHeaderParsed = false;
    bool isCreditsParsed = false;
    std::vector<unsigned char> rawCaffData;

    CaffHeader header;
    CaffCredits credits;
    std::vector<CaffAnimation> animations;
public:
    long long readBytesAsLongLong(long long start, long long length);
    std::string readBytesAsString(long long start, long long length);
    bool isCaffMagicValid(long long start);
    bool isCiffMagicValid(long long start);
    CiffData createCiffDataFromBytes(long long start);
    CaffHeader createHeaderFromBytes(long long start);
    CaffCredits createCreditsFromBytes(long long start);
    CaffAnimation createAnimationFromBytes(long long start);
    BlockInfo createBlockInfoFromBytes(long long start);
    void readBlock(long long start);
    void parseCaff(std::string infilename, std::string outfilename);


};

#endif //HF2_CAFF_HANDLER_HPP
