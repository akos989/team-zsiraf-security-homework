cmake_minimum_required(VERSION 3.17)
project(caff_parser)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_EXE_LINKER_FLAGS "-static")

include_directories(output_generation)

add_executable(caff_parser
        main.cpp
        output_generation/gif_writer.hpp
        output_generation/gif.h
        )