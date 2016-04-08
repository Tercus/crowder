# Crowder

## What is crowder?

crowder is a website that makes use of webtorrent to deliver videos, pictures and other media-files to its users. It is designed to be a torrent tracker, a torrent seed for all uploaded torrents and a community website.

## how it is supposed to work

From the Browser, users can select files they wish to upload. The website then makes use of webtorrent and seeds the files from the browser to the servers bittorrent-tracker. The server also starts downloading the file through the tracker from the user. Once completed, the server will also seed those files. This will ensure that every file has at least one seed. The uploaded files are then accessible through the website and can be viewed. Users will be able to stream videos through webtorrent inside their browsers.

## What is working

- [X] Select files from browser
- [X] Seed selected files to tracker
- [X] Server downloading seeded files
- [] Server seeding files, once download is complete
- [] Website showing a list of uploaded files

