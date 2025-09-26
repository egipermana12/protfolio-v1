<script setup lang="ts">
defineProps<{ cardTitle: string, cardDesc: string, cardImage: string, cardTag: object, linkHref: string }>()
</script>

<template>
    <li class="li_group">
        <a :href="linkHref" target="_blank" class="card_link">
            <div class="card_wrapper">
                <!-- untuk hover -->
                <div class="background_hover"></div>
                <!-- untuk text -->
                <div class="card_text">
                    <h3>
                        <span>{{cardTitle}}</span>
                    </h3>
                    <p class="card_desc">
                        {{ cardDesc }}
                    </p>
                    <!-- untuk tag -->
                    <ul class="card_tag">
                        <li class="tag_li" v-for="tag in cardTag">
                            <div class="tag_text">{{tag}}</div>
                        </li>
                    </ul>
                </div>
                <!-- untuk image -->
                <img :src="cardImage" width="200" height="48" alt="image" class="card_image">
            </div>
        </a>
    </li>
</template>

<style scoped>
/* base mobile */
h3 {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    line-height: 1.25;
}

.card_link {
    text-decoration: none;
    color: inherit;
    display: block;
}

.card_wrapper {
    position: relative;
    display: grid;
    gap: 1rem;
    padding-bottom: .25rem;
    transition-property: all;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    transition-duration: .15s;
}

.card_link:hover .background_hover{
    background-color: rgba(30, 41, 59, 0.5);
    box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card_text {
    z-index: 10;
}

.card_desc {
    margin-top: .5rem;
    font-size: .875rem;
    line-height: 1.5;
    color: var(--text-secondary)
}

.card_tag {
    margin-top: .5rem;
    display: flex;
    flex-wrap: wrap;
}

.tag_li {
    margin-right: .375rem;
    margin-top: .5rem;
}

.tag_text {
    display: flex;
    align-items: center;
    border-radius: 9999px;
    padding-left: .75rem;
    padding-right: .75rem;
    padding-top: .25rem;
    padding-bottom: .25rem;
    font-size: .75rem;
    line-height: 1rem;
    font-weight: 600;
    line-height: 1.25rem;
    background-color: rgba(59, 130, 246, .2);
    color: var(--accent);
}

img {
    display: block;
    vertical-align: middle;
    max-width: 100%;
    height: auto;
}

.card_image {
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-radius: .25rem;
    border-width: 2px;
    border-color: rgba(226, 232, 240, .1);
}

.background_hover{
    position: absolute;
    top: -1rem;
    bottom: -1rem;
    left: -1.5rem;
    right: -1.5rem;
    border-radius: 8px;
    display: none;
    z-index: 0;
}

@media (min-width: 640px) {
    .card_wrapper {
        grid-template-columns: repeat(8, minmax(0, 1fr));
        gap: 2rem;
    }

    .card_text {
        grid-column: span 6 / span 6;
        order: 2;
    }

    .card_image {
        order: 1;
        grid-column: span 2 / span 2;
        transform: translateY(.6rem);
    }
}

/* tablet */
@media (min-width: 768px) {
    .card_wrapper {
        gap: 1rem;
    }
}

/* desktop */
@media (min-width: 1024px) {
    .background_hover{
        display: block;
    }
}
</style>
