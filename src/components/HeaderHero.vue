<script setup lang="ts">
	import {useAnimeText} from '@func/useAnimeText.ts';

    const { text: text1, animeText: animeText1 } = useAnimeText("Egi Permana", 40);
    const { text: navLink1, animeText: animLink1 } = useAnimeText("ABOUT", 30);
    const { text: navLink2, animeText: animLink2 } = useAnimeText("PROJECTS", 30);
    const { text: navLink3, animeText: animLink3 } = useAnimeText("EXPERIENCE", 30);

</script>

<template>
	<header>
        <div>
            <!-- <p class="hai">Hello my name is</p> -->
            <h1 class="name bebas_nue_font">
                <RouterLink to="/"  @mouseenter="animeText1">
                    {{text1}}
                </RouterLink>
            </h1>
            <h3 class="Profesi">Coding Enthusiast</h3>
            <h5 class="desc">A passionate Web Programmer who loves<br>
                write code and learn programming</h5>
            <!-- nav -->
             <nav class="nav">
                <ul class="nav-ul">
                    <li>
                        <a class="nav-link active" href="/" @mouseenter="animLink1">
                            <span class="nav-link__hr"></span>
                            <span class="nav-link__text">{{navLink1}}</span>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="/" @mouseenter="animLink2">
                            <span class="nav-link__hr"></span>
                            <span class="nav-link__text">{{navLink2}}</span>
                        </a>
                    </li>
                    <li>
                        <a class="nav-link" href="/" @mouseenter="animLink3">
                            <span class="nav-link__hr"></span>
                            <span class="nav-link__text">{{navLink3}}</span>
                        </a>
                    </li>
                </ul>
             </nav>
        </div>
        <ul class="wrapper-social">
            <li>
                <a href="/">
                    <svg class="social-icon" width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2019_92)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.97318 0C4.01125 0 0 4.125 0 9.22819C0 13.3074 2.57014 16.7604 6.13561 17.9826C6.58139 18.0744 6.74467 17.784 6.74467 17.5397C6.74467 17.3258 6.72998 16.5924 6.72998 15.8284C4.23386 16.3785 3.71406 14.7283 3.71406 14.7283C3.31292 13.6588 2.71855 13.3839 2.71855 13.3839C1.90157 12.8186 2.77806 12.8186 2.77806 12.8186C3.68431 12.8797 4.15984 13.7659 4.15984 13.7659C4.96194 15.1714 6.25445 14.7742 6.77443 14.5297C6.84863 13.9339 7.08649 13.5214 7.33904 13.2922C5.3482 13.0783 3.25359 12.2839 3.25359 8.73919C3.25359 7.73081 3.60992 6.90581 4.17453 6.26419C4.08545 6.03506 3.77339 5.08763 4.2638 3.81956C4.2638 3.81956 5.02145 3.57506 6.7298 4.76681C7.4612 4.56481 8.21549 4.46205 8.97318 4.46119C9.73084 4.46119 10.5032 4.56825 11.2164 4.76681C12.9249 3.57506 13.6826 3.81956 13.6826 3.81956C14.173 5.08763 13.8607 6.03506 13.7717 6.26419C14.3511 6.90581 14.6928 7.73081 14.6928 8.73919C14.6928 12.2839 12.5982 13.0629 10.5924 13.2922C10.9194 13.5825 11.2015 14.1324 11.2015 15.0034C11.2015 16.2409 11.1868 17.2341 11.1868 17.5395C11.1868 17.784 11.3503 18.0744 11.7959 17.9827C15.3613 16.7603 17.9315 13.3074 17.9315 9.22819C17.9462 4.125 13.9202 0 8.97318 0Z" fill="currentColor"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2019_92">
                        <rect width="18" height="18" fill="currentColor"/>
                        </clipPath>
                        </defs>
                    </svg>
                </a>
            </li>
            <li>
                <a href="/">
                    <svg class="social-icon" width="18" height="14" viewBox="0 0 18 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2019_94)">
                        <path d="M17.047 11.725V2.27499C17.047 1.40349 16.4086 0.699982 15.6176 0.699982H2.26694C1.476 0.699982 0.837524 1.40349 0.837524 2.27499V11.725C0.837524 12.5965 1.476 13.3 2.26694 13.3H15.6176C16.4086 13.3 17.047 12.5965 17.047 11.725ZM15.7987 2.15949C16.1132 2.50599 15.9416 2.86299 15.7701 3.04149L11.9012 6.94749L15.6176 11.2105C15.732 11.3575 15.8082 11.5885 15.6748 11.746C15.5509 11.914 15.265 11.9035 15.1412 11.7985L10.9768 7.88199L8.93752 9.92949L6.90775 7.88199L2.74341 11.7985C2.61953 11.9035 2.33365 11.914 2.20976 11.746C2.07635 11.5885 2.15259 11.3575 2.26694 11.2105L5.9834 6.94749L2.11447 3.04149C1.94294 2.86299 1.77141 2.50599 2.08588 2.15949C2.40035 1.81299 2.72435 1.98099 2.99118 2.23299L8.93752 7.52499L14.8934 2.23299C15.1602 1.98099 15.4842 1.81299 15.7987 2.15949Z" fill="currentColor"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_2019_94">
                        <rect width="18" height="14" fill="currentColor"/>
                        </clipPath>
                        </defs>
                    </svg>
                </a>
            </li>
            <li>
                <a href="/" class="cv">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.75 9.25V12.25C15.75 12.6478 15.592 13.0294 15.3107 13.3107C15.0294 13.592 14.6478 13.75 14.25 13.75H3.75C3.35218 13.75 2.97064 13.592 2.68934 13.3107C2.40804 13.0294 2.25 12.6478 2.25 12.25V9.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.25 7.5L9 11.25L12.75 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 11.25V2.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>Download CV</p>
                </a>
            </li>
        </ul>
    </header>
</template>

<style scoped>
	/* base mobile */
.wrapper-social{
    margin-left: .25rem;
    margin-top: 2rem;
    display: flex;
    justify-items: center;
}

.wrapper-social > li{
    flex-shrink: 0;
    margin-right: 1.25rem;
}

.social-icon{
    font-size: .75rem;
    line-height: 1rem;
    color: var(--text-secondary);
    height: 1.5rem;
    width: 1.5rem;
}

.social-icon:hover{
    color: var(--text);
}

.cv {
    display: flex;
    gap: 0.2rem;
    color: var(--text-secondary);
    align-items: center;
}
.cv > * {
    /* font-size: .75rem; */
    line-height: 1rem;
}
.cv > svg {
    height: 1.5rem;
    width: 1.5rem;
}
.cv > p{
    margin: 0;
    padding: 0;
}

.cv:hover{
    color: var(--text);
}

.nav {
    display: none;
}

.nav-ul {
    width: max-content;
    margin-top: 4rem;
}

.nav-link {
    display: flex;
    align-items: center;
    padding-top: .75rem;
    padding-bottom: .75rem;
    color: var(--text-secondary);
    font-size: 12px;
    font-weight: 800;
    transition: color 0.3s ease;
    text-transform: uppercase;
}

.nav-link__hr{
    display: block;
    width: 1.5rem;
    height: 0.02rem;
    margin-right: 1rem;
    background-color: var(--text-secondary);
}
/**group hover */
.nav-link:hover .nav-link__text { 
    color: var(--text);
}
.nav-link:hover .nav-link__hr{
    background-color: var(--text);
    width: 3.5rem;
}

/**active */
.active .nav-link__text { 
    color: var(--text);
}

.active .nav-link__hr{
    background-color: var(--text);
    width: 3.5rem;
}

.name > a{
    font-size: 2.25rem;
    line-height: 2.5rem;
}

.Profesi {
    font-size: 0.98rem;
    line-height: 1.75rem;
    margin-top: -1.8rem;
    font-weight: 400;
}

.desc{
    font-weight: 400;
    color: var(--text-secondary);
    max-width: 20rem;
    font-size: 15px;
}


/* tablet */
@media (min-width: 768px){
    .name > a{
        font-size: 3.5rem;
        line-height: .8rem;
        /* text-transform: uppercase; */
    }

    .hai{
        font-weight: 300;
        color: var(--text-secondary);
        font-size: 18px;
        margin-bottom: -0.8rem;
        font-weight: 300;
    }

    .Profesi{
        font-size: 1.35rem;
        line-height: 1.85rem;
        font-weight: 500;
        color: var(--text);
        margin-top: -1.6rem;
    }

    .desc{
        font-size: 16px;
        font-weight: 500;
        color: var(--text-secondary);
    }
}

/* desktop */
@media (min-width: 1024px) {
    header{
        padding-top: 6rem;
        padding-bottom: 6rem;
        width: 48%;
        max-height: 100vh;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        top: 0;
        position: sticky;
    }

    .nav{
        display: block;
    }
}
</style>