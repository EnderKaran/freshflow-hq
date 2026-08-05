#!/bin/bash
pnpm run dev > dev_server.log 2>&1 &
echo $! > server.pid
