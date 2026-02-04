import { Play, Pause } from './Player';
import { usePlayerStore } from '@store/playerStore';
import { playlists, songs } from '@lib/data';

export function CardPlayButton({ id }) {
	const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic } =
		usePlayerStore((state) => state);

	const isPlayingCurrent = isPlaying && currentMusic?.playlist.id === id;

	const handleClick = (e) => {
		e.stopPropagation();
		if (isPlayingCurrent) {
			setIsPlaying(false);
			return;
		}

		//promises
		fetch(`/api/get-info-playlist.json?id=${id}`)
			.then((res) => res.json())
			.then((data) => {
				const { songs, playlist } = data;
				setIsPlaying(true);
				setCurrentMusic({ songs, playlist, song: songs[0] });
			});

		//async await -> para usarlo debo hacer que la funcion handleClick sea async
		// const response = await fetch(`/api/get-info-playlist.json?id=${id}`);
		// const data = await response.json();
		// const { songs, playlist } = data;
		// setIsPlaying(true);
		// setCurrentMusic({ songs, playlist, song: songs[0] });
	};

	return (
		<button
			onClick={handleClick}
			className="card-play-button bg-green-500 text-white rounded-full w-16 h-16 grid place-content-center "
		>
			{isPlayingCurrent ? <Pause /> : <Play />}
		</button>
	);
}
