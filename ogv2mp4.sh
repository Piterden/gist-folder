#!/bin/bash
## Converts `ogv` -> `mp4`

input_file="$1"

ffmpeg -i wavestelegram_-1.ogv -c:v libx264 jumpung.mp4
