#!/bin/bash
# Claude Code Status Line — dot-style progress bars with green→yellow→red gradient
input=$(cat)

model=$(echo "$input" | jq -r '.model.display_name')
dir=$(echo "$input" | jq -r '.workspace.current_dir')
five=$(echo "$input" | jq -r '.rate_limits.five_hour.used_percentage // empty')
week=$(echo "$input" | jq -r '.rate_limits.seven_day.used_percentage // empty')

# dot progress bar: 10 dots, color transitions green→yellow→red
# usage: dots_bar <percentage (0-100)>
dots_bar() {
    local pct=${1%.*}
    local total=10
    local filled=$(( pct * total / 100 ))
    [ $filled -gt $total ] && filled=$total
    [ $filled -lt 0 ] && filled=0

    local color
    if [ $pct -le 30 ]; then
        color="32"   # green
    elif [ $pct -le 70 ]; then
        color="33"   # yellow
    else
        color="31"   # red
    fi

    local i result=""
    for ((i=0; i<total; i++)); do
        if [ $i -lt $filled ]; then
            result="${result}$(printf '\033[%sm●\033[0m' "$color")"
        else
            result="${result}$(printf '\033[90m●\033[0m')"
        fi
    done
    printf '%s' "$result"
}

# build status line
printf '\033[1m%s\033[0m  \033[36m%s\033[0m' "$model" "$dir"

if [ -n "$five" ]; then
    printf '  5h:'
    dots_bar "$five"
fi

if [ -n "$week" ]; then
    printf '  7d:'
    dots_bar "$week"
fi

printf '\n'