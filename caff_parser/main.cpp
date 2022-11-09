#include <string>
#include <iostream>

#include "caff_handler.cpp"

int main(int argc, char** argv)
{
    std::string infilename;
    std::string outfilename;
    CaffHandler caffHandler;

    if(argc == 2)
    {
        infilename = argv[1];
    }
    else if(argc == 3)
    {
        infilename = argv[1];
        outfilename = argv[2];
    }
    else if (argc < 2)
    {
        std::cerr << "Not enough arguments provided!" << std::endl;
    }
    else
    {
        std::cerr << "Too many arguments provided!" << std::endl;
    }

    try
    {
        caffHandler.parseCaff(infilename, outfilename);
        std::cout << "Parsing finished";
    }
    catch (...)
    {
        std::cerr << "Parsing error!" << std::endl;
    }

    return 0;
}
