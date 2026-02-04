import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '@store/playerStore.js';
import { Slider } from './Slider';

export const Play = () => (
	<svg
		data-encore-id="icon"
		role="img"
		aria-hidden="true"
		className="e-91000-icon e-91000-baseline w-12"
		viewBox="0 0 16 16"
	>
		<path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
	</svg>
);

export const Pause = () => (
	<svg
		aria-hidden="true"
		className="e-91000-icon e-91000-baseline w-12"
		data-encore-id="icon"
		role="img"
		viewBox="0 0 16 16"
	>
		<path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z" />
	</svg>
);

const CurrentSong = ({ image, title, artists }) => {
	return (
		<div className="flex overflow-hidden items-center gap-4">
			<picture className="w-16 h-auto overflow-hidden shadow-lg rounded-md">
				<img
					src={image}
					alt={title}
					className="aspect-square object-cover"
				/>
			</picture>
			<div>
				<h3 className="font-semibold text-xl">{title}</h3>
				<span className="text-sm opacity-80">
					{artists?.join(', ')}
				</span>
			</div>
		</div>
	);
};

export function Player() {
	// const [isPlaying, setIsPlaying] = useState(false); //Estado local
	const { currentMusic, isPlaying, setIsPlaying } = usePlayerStore(
		(state) => state,
	); //Estado global usando zustand
	const audioRef = useRef(null);

	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying]);

	useEffect(() => {
		const { song, playlist, songs } = currentMusic;
		if (song) {
			const src = `/music/${playlist.id}/0${song.id}.mp3`;
			audioRef.current.src = src;
			audioRef.current.volume = 0.2;
			audioRef.current.play();
		}
	}, [currentMusic]);

	const handleClick = () => {
		setIsPlaying(!isPlaying);
	};

	return (
		<div className="flex flex-row justify-between z-50 px-4 w-full h-full items-center">
			<div>
				<CurrentSong {...currentMusic.song} />
			</div>
			<div className="grid place-content-center gap-4">
				<div className="flex justify-center bg-white rounded-full w-18 h-18 items-center">
					<button onClick={handleClick}>
						{isPlaying ? <Pause /> : <Play />}
					</button>
				</div>
			</div>
			<div>
				<Slider
					defaultValue={[100]}
					max={100}
					min={0}
					className="w-23.75"
					onValueChange={(value) => {
						const [newVolume] = value;
						audioRef.current.volume = newVolume / 100;
					}}
				/>
				<audio ref={audioRef} />
			</div>
		</div>
	);
}
