// navbar styling
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', ()=> {
    navbarLinks.classList.toggle('active')
})

navbarLinks.addEventListener('click', ()=> {
    navbarLinks.classList.toggle('active')
  })

window.onload = function() {
    new p5(ambiencePlayer);
    new p5(bellsSketch);
};

// Podcast data
const podcasts = [
    {
        id: "umwelt",
        title: "Umwelt",
        client: "Independent Production",
        role: "Creator, host, producer, sound designer and mix engineer",
        description: "A podcast exploring how different animals experience the world through their unique perceptual systems.",
        image: "/images/umwelt-artwork.jpg",
        links: [
            { label: "Website", url: "https://umweltpodcast.com.au/" }
            // { label: "Apple Podcasts", url: "https://podcasts.apple.com/au/podcast/umwelt/id1749923040" }
        ]
    },
    {
        id: "hold-the-moment",
        title: "Hold The Moment",
        client: "Dementia Australia & Deadset Studios",
        role: "Sound designer and mix engineer (season 2)",
        description: "Dementia Australia's Hold the Moment podcast shares uplifting stories about people living with dementia and their loved ones.",
        image: "/images/htm-artwork.jpg",
        links: [
            { label: "Website", url: "https://www.dementia.org.au/living-dementia/hold-moment-podcast" }
            // { label: "Apple Podcasts", url: "https://podcasts.apple.com/au/podcast/umwelt/id1749923040" }
        ]
    },
    {
        id: "news-club",
        title: "News Club",
        client: "Squiz Media",
        role: "Producer, editor and mix engineer",
        description: "News Club is the place to go for conversations about the news. It’s a step beyond the headlines with curated perspectives about the events and people shaping and making headlines.",
        image: "/images/news-club-artwork.jpg",
        links: [
            { label: "Website", url: "https://thesquiz.com.au/podcasts/news-club" }
            // { label: "Apple Podcasts", url: "https://podcasts.apple.com/au/podcast/umwelt/id1749923040" }
        ]
    },
    {
        id: "find-and-tell",
        title: "Find and Tell",
        client: "iHeartPodcast Australia",
        role: "Supervising producer, sound designer and mix engineer",
        description: "After an Australia-wide search, four undiscovered talent go head-to-head in a battle to find the best untold stories. Listen with host Jamila Rizvi each week, as she decides who will be the first Find and Tell champion.",
        image: "/images/find-and-tell-artwork.jpg",
        links: [
            { label: "Website", url: "https://www.findandtell.com.au/" }
            // { label: "Apple Podcasts", url: "https://podcasts.apple.com/au/podcast/find-and-tell/id1717007282" }
        ]
    },
    {
        id: "concealed",
        title: "Concealed With Art Simone",
        client: "iHeartPodcast Australia",
        role: "Sound designer and mix engineer",
        description: "Join our favourite drag queen, Art Simone as she puts on her detective cap, to solve a riddle and extract a confession from each guest, having their secret life exposed.",
        image: "/images/concealed-artwork.jpg",
        links: [
            { label: "Website", url: "https://www.artsimone.com/podcast" }
            // { label: "Apple Podcasts", url: "https://podcasts.apple.com/au/podcast/concealed-with-art-simone/id1645216739" }
        ]
    },
    {
        id: "family-feud",
        title: "Family Feud: The Podcast",
        client: "iHeartPodcast Australia",
        role: "Sound designer, mix engineer and audio editor",
        description: "The gameshow you know and love is a podcast! Join host Pete Helliar and Australia's funniest celebrities as they fight for glory in Family Feud.",
        image: "/images/family-feud-artwork.jpg",
        links: [
            { label: "Apple Podcasts", url: "https://podcasts.apple.com/au/podcast/family-feud-the-podcast/id1632348564" }
        ]
    },
    {
        id: "temporary",
        title: "Temporary",
        client: "The Guardian",
        role: "Sound designer and mix engineer",
        description: "Caught in Australia's campaign to 'stop the boats' were 30,000 people who landed, only to enter a legal limbo. Temporary is an eight-part podcast series that showcases stories from those seeking asylum in Australia",
        image: "/images/temporary-artwork.jpg",
        links: [
            { label: "Website", url: "https://www.theguardian.com/australia-news/series/temporary" }
            // { label: "Apple Podcasts", url: "https://podcasts.apple.com/au/podcast/temporary/id1540927312" }
        ]
    },
        {
        id: "all-the-best",
        title: "All The Best",
        client: "FBi Radio",
        role: "Executive producer",
        description: "A weekly half-hour national radio program and podcast devoted to short-form features, documentaries and fiction.",
        image: "/images/atb-artwork.jpg",
        links: [
            { label: "Website", url: "https://allthebestradio.com/" }
            // { label: "Apple Podcasts", url: "https://podcasts.apple.com/au/podcast/umwelt/id1749923040" }
        ]
    },
    {
        id: "trapped",
        title: "Trapped",
        client: "The Australian War Memorial",
        role: "Sound designer and mix engineer",
        description: "Trapped is a six part series about a group of Australian airmen stranded on Japanese-occupied Timor during the Second World War. Using diaries of the airmen, wartime records and interviews with survivors, Trapped brings to life one of the greatest stories of survival and escape of the Pacific War. A true story of leadership, courage, mateship, and, at times, cruelty and violence that played out on a remote tropical island during one of history's bloodiest conflicts.",
        image: "/images/trapped-artwork.jpg",
        links: [
            { label: "Website", url: "https://www.awm.gov.au/learn/podcasts/trapped" }
            // { label: "Apple Podcasts", url: "https://podcasts.apple.com/au/podcast/trapped/id1500206643" }
        ]
    },
    {
        id: "full-story",
        title: "Full Story",
        client: "The Guardian",
        role: "Sound designer, mix engineer, producer and audio editor",
        description: "Guardian Australia's daily news podcast. Every weekday, join Guardian journalists for a deeper understanding of the news in Australia and beyond.",
        image: "/images/full-story-artwork.jpg",
        links: [
            { label: "Website", url: "https://www.theguardian.com/profile/ryan-pemberton" },
        ]
    },
    {
        id: "somerton-man",
        title: "RN Presents: The Somerton Man Mystery",
        client: "ABC",
        role: "Sound designer and audio editor",
        description: "In post-war Adelaide, there's a feeling of optimism and relief in the air, but it's mixed with paranoia about the changing world order. And in this mix, on a summer day on Somerton Beach, a man's body is discovered.",
        image: "/images/somerton-man-artwork.jpg",
        links: [
            { label: "Website", url: "https://www.abc.net.au/listen/programs/rn-presents/the-strange-case-of-the-body-on-the-beach/11517516" }
            // { label: "Apple Podcasts", url: "#" }
        ]
    },
    {
        id: "trace",
        title: "Trace",
        client: "ABC",
        role: "Producer and audio editor (season 1)",
        description: "An investigative podcast hosted by ABC journalist Rachael Brown. Series 1 reviews the cold case murder of Maria James who was stabbed in her Melbourne bookshop in 1980.",
        image: "/images/trace-artwork.jpg",
        links: [
            { label: "Website", url: "https://www.abc.net.au/listen/programs/trace/01-trace-bookshop-murder/8659938" }
            // { label: "Apple Podcasts", url: "#" }
        ]
    }
];

// Generate grid items
const grid = document.querySelector('.portfolio-grid');
podcasts.forEach(podcast => {
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    item.innerHTML = `<img src="${podcast.image}" alt="${podcast.title}">`;
    item.addEventListener('click', () => showModal(podcast));
    grid.appendChild(item);
});

// Modal functionality
const modal = document.querySelector('.modal');
const closeBtn = modal.querySelector('.close-button');

function showModal(podcast) {
    modal.querySelector('.modal-title').textContent = podcast.title;
    modal.querySelector('.description').textContent = podcast.description;
    modal.querySelector('.client').textContent = podcast.client;
    modal.querySelector('.role').textContent = podcast.role;
    
    // Get the website URL
    const imageLink = podcast.links[0]?.url || '#';
    
    // Wrap the image in an anchor tag
    const artworkContainer = modal.querySelector('.modal-artwork');
    artworkContainer.innerHTML = `
        <a href="${imageLink}" target="_blank">
            <img src="${podcast.image}" alt="${podcast.title}">
        </a>`;
    
    const linksContainer = modal.querySelector('.links');
    linksContainer.innerHTML = podcast.links
        .map(link => `<a href="${link.url}" target="_blank">${link.label}</a>`)
        .join('');

    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});
