grep -Rno '<button[^>]*>' app components | while read -r line; do
  file=$(echo "$line" | cut -d: -f1)
  lineno=$(echo "$line" | cut -d: -f2)
  echo "--- $file:$lineno ---"
  sed -n "${lineno},/^[^<]*<\/button>/p" "$file" | head -n 10
done
