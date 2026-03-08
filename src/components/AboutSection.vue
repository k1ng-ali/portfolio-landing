<template>
  <section id="about" ref="sectionEl">
    <div class="wrap">
      <div class="about-grid">

        <!-- Text -->
        <div class="about-body" ref="bodyEl">
          <div class="lbl">{{ $t('about.label') }}</div>
          <h2 class="stitle">
            {{ $t('about.title') }} <span class="accent2">{{ $t('about.titleAccent') }}</span>
          </h2>

          <p>
            <i18n-t keypath="about.p1">
              <template #name><strong>{{ $t('about.p1Name') }}</strong></template>
            </i18n-t>
          </p>
          <p>
            <i18n-t keypath="about.p2">
              <template #highlight><strong>{{ $t('about.p2Highlight') }}</strong></template>
            </i18n-t>
          </p>
          <p>
            <i18n-t keypath="about.p3">
              <template #country><strong>{{ $t('about.p3Country') }}</strong></template>
            </i18n-t>
          </p>

          <div class="val-grid">
            <div v-for="v in $tm('about.values')" :key="v.title" class="val-card">
              <span class="val-ico">{{ v.icon }}</span>
              <div>
                <h4>{{ v.title }}</h4>
                <p>{{ v.sub }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Photo -->
        <div class="about-photo-wrap" ref="photoEl">
          <img src="/about-pic.png" alt="shaxzod"/>
          👨‍💻
          <div class="photo-glow"></div>
          <div class="exp-badge">
            <div class="exp-yr">{{ $t('about.expYears') }}</div>
            <div class="exp-lbl">{{ $t('about.expLabel') }}</div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import {useGsap} from "@/util.ts";

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()

const sectionEl = ref(null)
const bodyEl    = ref(null)
const photoEl   = ref(null)

const {init, cleanup} = useGsap(sectionEl)

onMounted(() => {
  init(() => {

    gsap.from(bodyEl.value, {
      opacity: 0,
      x: -35,
      duration: .75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionEl.value,
        start: 'top 76%',
        once: true
      }
    })

    gsap.from(photoEl.value, {
      opacity: 0,
      x: 35,
      duration: .75,
      ease: 'power3.out',
      delay: .12,
      scrollTrigger: {
        trigger: sectionEl.value,
        start: 'top 76%',
        once: true
      }
    })

    gsap.from('.val-card', {
      opacity: 0,
      y: 18,
      stagger: .09,
      duration: .55,
      ease: 'power2.out',
      delay: .35,
      scrollTrigger: {
        trigger: sectionEl.value,
        start: 'top 76%',
        once: true
      }
    })

  })
})
onUnmounted(cleanup)
</script>

<style scoped lang="scss">
#about { background: var(--bg); }

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 5rem;
  align-items: center;
}

.about-body {
  p {
    color: var(--muted);
    line-height: 1.8;
    font-size: .97rem;
    margin-bottom: 1.2rem;
    :deep(strong) { color: var(--text); font-weight: 600; }
  }
}

.accent2 { color: var(--accent2); }

.val-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .85rem;
  margin-top: 2.2rem;
}

.val-card {
  display: flex; align-items: flex-start; gap: 11px;
  padding: 15px; background: var(--card);
  border: 1px solid var(--border); border-radius: var(--radius);
  transition: border-color .25s;

  &:hover { border-color: rgba(124, 109, 250, .3); }

  h4 { font-size: .83rem; font-weight: 600; margin-bottom: 2px; letter-spacing: -.01em; }
  p  { font-size: .76rem; color: var(--muted); margin: 0; line-height: 1.4; }
}

.val-ico { font-size: 1.4rem; flex-shrink: 0; margin-top: 1px; }

.about-photo-wrap {
  position: relative; border-radius: 22px; overflow: hidden;
  aspect-ratio: 3 / 4; background: var(--bg3);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center; font-size: 6rem;
  max-height: calc(100% - 160px);

  img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
}

.photo-glow {
  position: absolute; bottom: -25%; left: 50%; transform: translateX(-50%);
  width: 75%; height: 55%;
  background: radial-gradient(ellipse, rgba(124, 109, 250, .22) 0%, transparent 70%);
  pointer-events: none;
}

.exp-badge {
  position: absolute; bottom: 16px; right: 16px;
  background: rgba(10, 10, 18, .88); border: 1px solid var(--border);
  backdrop-filter: blur(12px); border-radius: 12px;
  padding: 13px 16px; text-align: center;
}

.exp-yr  { font-family: var(--font2); font-size: 1.9rem; font-weight: 800; color: var(--accent); line-height: 1; }
.exp-lbl { font-size: .65rem; color: var(--muted); margin-top: 2px; line-height: 1.3; }

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .about-photo-wrap {
    max-width: 420px;
    margin: 0 auto;
    width: 100%;
    max-height: none;
    /* УБРАТЬ aspect-ratio:1 */
  }
}

@media (max-width: 768px) {
  .val-grid { grid-template-columns: 1fr; }
  .exp-badge {
    padding: 9px 11px;
    bottom: 10px;
    right: 10px;
  }

  .about-photo-wrap {
    width: 100%;
    /* УБРАТЬ aspect-ratio:1 */
  }

  .exp-yr {
    font-size: 1.4rem;
  }

  .exp-lbl {
    font-size: .55rem;
  }
}
</style>
