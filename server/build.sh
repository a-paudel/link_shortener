rm -r .embedded/client
cd ../client
pnpm build
cp -r build/ ../server/.embedded/client
cd ../server
go build