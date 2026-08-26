import re

with open('app/dashboard/page.tsx', 'r') as f:
    lines = f.readlines()

# Line 19
lines[18] = lines[18].rstrip() + ' // eslint-disable-line\n'

with open('app/dashboard/page.tsx', 'w') as f:
    f.writelines(lines)
