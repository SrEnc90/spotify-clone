import { useState } from 'react';

const Play = () => (
	<svg
		data-encore-id="icon"
		role="img"
		aria-hidden="true"
		className="e-91000-icon e-91000-baseline w-16 bg-white rounded-full p-2"
		viewBox="0 0 16 16"
	>
		<path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
	</svg>
);

const Pause = () => (
	<svg
		data-encore-id="icon"
		role="img"
		aria-hidden="true"
		className="e-91000-icon e-91000-baseline w-16 bg-white rounded-full p-2"
		viewBox="0 0 16 16"
	>
		<path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"></path>
	</svg>
);

export function Player() {
	const [isPlaying, setIsPlaying] = useState(false);
	return (
		<div className="flex flex-row justify-between z-50 px-4 w-full h-full items-center">
			<div>CurrentSong...</div>
			<div className="grid place-content-center gap-4">
				<div className="flex justify-center">
					<button onClick={() => setIsPlaying(!isPlaying)}>
						{isPlaying ? <Pause /> : <Play />}
					</button>
				</div>
			</div>
			<div>Volumen</div>
		</div>
	);
}
