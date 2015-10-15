#!/bin/bash

declare -a file_names=(.bash_profile .bash_prompt .aliases)
url=https://raw.githubusercontent.com/Angarsk8/solarized-dark-iterm/master

if [[ -f $(which curl) ]]; then
	for file in "${file_names[@]}" 
	do
		full_path=$url/$file
		echo "Downloading $file"
		curl $full_path >> $file
	done
	echo "The configuration process has finished, quit iterm and re-open it and have fun with you new iterm look!!"
	exit 0
else
	echo "The configuration failed because the curl utility is not installed on this machine" 
	exit 1
fi