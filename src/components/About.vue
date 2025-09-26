<script setup lang="ts">
	import profile from '@img/profile.png';
</script>

<template>
	<section id="about" class="about">
        <!-- untuk text about mobile -->
        <div class="wrapper-title__mobile">
            <h2 class="title__mobile">About</h2>
        </div>
        <!-- avatar -->
        <div class="avatar_wrapper">
            <span class="accent_avatar"></span>
            <img :src="profile" alt="avatar" class="avatar">
        </div>
        <!-- descripsi -->
        <div class="about_desc">
            <p>Hi there 👋 I’m a coding enthusiast who loves building projects — sometimes from my own ideas, sometimes
                inspired by others. Most of the time, I work with <span class="marker">PHP</span>, but I also enjoy
                experimenting with <span class="marker">Node.js</span> and spending time learning languages that focus
                on performance and efficiency, such as <span class="marker">Golang</span>.</p>
            <p>Currently, I’m part of the <span class="marker"> IT Support team at a Software House</span>, where I
                contribute to <span class="marker">database migrations</span>, assist other divisions with <span
                    class="marker">automated testing using Selenium and Node.js</span>, and occasionally develop APIs to
                support integrations with other companies. I also provide <span class="marker">technical support</span>
                to our customers</p>
            <p>While I’ve gained valuable experience in my current role, I feel it doesn’t fully allow me to grow as a
                programmer. That’s why I’m now looking to take the next step in my career as a <span
                    class="marker">software developer</span>. I’m open to both <span class="marker">full-time
                    opportunities</span> and <span class="marker">freelance projects</span>.</p>
            <p>I’d be happy if you could check out my portfolio, where I showcase some of the projects I’ve built</p>
        </div>
    </section>	
</template>

<style scoped>
	/* base mobile */
.about {
    margin-bottom: 3rem;
    scroll-margin-top: 4rem;
}

.wrapper-title__mobile {
    position: sticky;
    top: 0;
    z-index: 20;
    margin-left: -1.5rem;
    margin-right: -1.5rem;
    margin-bottom: 1rem;
    width: 100vw;
    background-color: var(--bg);
    padding-top: 1rem;
    padding-bottom: .2rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    --tw-backdrop-blur: blur(8px);
}

.title__mobile {
    color: var(--text);
    letter-spacing: .1em;
    text-transform: uppercase;
    font-weight: 700;
    font-size: .875rem;
    line-height: 1.25rem;
}

.about_desc {
    color: var(--text-secondary)
}

.about_desc p {
    line-height: 1.5rem;
    margin-bottom: 1rem;
}

.marker {
    font-weight: 600;
    color: var(--text)
}

.avatar_wrapper {
    position: relative;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
}

.avatar {
    position: relative;
    margin-left: 1rem;
    margin-top: .5rem;
    width: 100%;
    height: auto;
    max-width: 55px;
}

.accent_avatar {
    position: absolute;
    left: 0;
    width: 70px;
    height: 70px;
    background: #2563eb;
    border-radius: 100%;
    margin-left: .5rem;
    margin-top: 0.7rem;
}


/* tablet */
@media (min-width: 768px) {
    .about {
        margin-bottom: 6rem;
    }

    .wrapper-title__mobile {
        margin-left: -3rem;
        margin-right: -3rem;
        padding-left: 3rem;
        padding-right: 3rem;
    }

}

/* desktop */
@media (min-width: 1024px) {
    .about {
        margin-bottom: 9rem;
        scroll-margin-top: 6rem;
    }

    .wrapper-title__mobile {
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
        position: relative;
        top: auto;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
        padding-left: 0;
        padding-right: 0;
        padding-top: 0;
        padding-bottom: 0;
        opacity: 0;
    }

    .title__mobile {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
 }
</style>