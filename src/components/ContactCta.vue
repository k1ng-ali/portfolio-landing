<template>
  <section id="cta" ref="sectionEl">
    <div class="cta-glow"></div>
    <div class="wrap cta-inner">
      <div class="lbl">{{ $t('contact.label') }}</div>
      <h2 class="stitle">{{ $t('contact.title') }}</h2>
      <p class="ssub">{{ $t('contact.sub') }}</p>
      <div class="cta-btns">
        <!-- email/telegram берётся из config.json, не из i18n — @ не ломает парсер -->
        <a :href="`mailto:${config.email}`" class="btn-p">
          {{ $t('contact.btn1') }}
        </a>
        <a :href="`https://t.me/${config.telegram}`" target="_blank" rel="noopener" class="btn-tg">
          {{ $t('contact.btn2') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import config from '@/config.json'
import {useGsap} from "@/util.ts";

gsap.registerPlugin(ScrollTrigger)

const sectionEl = ref(null)

const { init, cleanup } = useGsap(sectionEl)

onMounted(() => {
  const elements = sectionEl.value.querySelectorAll('.lbl, .stitle, .ssub, .cta-btns')
  init(() => {
    elements.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 22,
        stagger: .13,
        duration: .65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        }
      })
    })
  })
})
onUnmounted(cleanup)
</script>

<style scoped lang="scss">
#cta {
  padding: 7.5rem 6%; text-align: center; position: relative; overflow: hidden; background: var(--bg2);
}
.cta-glow {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 65% 65% at 50% 50%, rgba(124, 109, 250, .1) 0%, transparent 60%);
  pointer-events: none;
}
.cta-inner {
  position: relative; z-index: 1;
  .stitle { text-align: center; margin-bottom: .9rem; }
  .ssub   { text-align: center; margin: 0 auto 2.5rem; }
}
.cta-btns { display: flex; gap: .875rem; justify-content: center; flex-wrap: wrap; }
.btn-tg {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--bg3); color: var(--text); padding: 13px 26px;
  border-radius: 50px; font-weight: 600; font-size: .9rem; text-decoration: none;
  border: 1px solid var(--border); transition: border-color .3s, background .3s, transform .2s;
  &:hover { border-color: rgba(255, 255, 255, .18); background: var(--bg2); transform: translateY(-2px); }
}
</style>
