#include <string>
#include <iostream>

#include "caff_handler.cpp"

int main(int argc, char** argv)
{
    std::string filename;
    CaffHandler caffHandler;

    if (argc >= 2)
    {
        filename = argv[1];
    }
    else
    {
        std::cerr << "No file given!" << std::endl;
    }

    try
    {
        caffHandler.parseCaff(filename);
        std::cout << "CONVERSION SUCCESFUL";
    }
    catch (...)
    {
        std::cerr << "Parsing error!" << std::endl;
    }

    return 0;
}
