import { allPlaylists, songs as allSongs } from '@lib/data';

export async function GET({ params, request }) {
	//get the id from the url search params
	const { url } = request;
	//Forma 1
	// const [, queryString] = url.split('?'); // Split the URL to get the query string and ignore the base URL using destructuring '[_,...]'
	// const query = new URLSearchParams(queryString);
	// const id = query.get('id');

	//Forma 2
	const urlObject = new URL(request.url);
	const id = urlObject.searchParams.get('id');

	const playlist = allPlaylists.find((pl) => pl.id === id);
	const songsInPlaylist = allSongs.filter(
		(song) => song.albumId === playlist?.albumId,
	);

	return new Response(
		JSON.stringify({
			playlist,
			songs: songsInPlaylist,
		}),
		{
			headers: { 'Content-Type': 'application/json' },
		},
	);
}
