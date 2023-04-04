rm -r .embedded/client
mkdir .embedded
cd ../client
pnpm build
mkdir .embedded
cp -r build/ ../server/.embedded/client
cd ../server
go build