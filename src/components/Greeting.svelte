<script lang="ts">
	const currentTime = new Date();
	const currenteHour = currentTime.getHours();
	let greeting: string;

	if (currenteHour < 12) {
		greeting = 'Good Morning';
	} else if (currenteHour < 18) {
		greeting = 'Good Afternoon';
	} else {
		greeting = 'Good Evening';
	}
</script>

<h1 class="text-4xl font-bold">{greeting}</h1>
