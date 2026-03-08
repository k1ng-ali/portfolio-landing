<template>
  <div id="stats" ref="statsEl">
    <div class="stats-row wrap">
      <div v-for="item in $tm('stats.items')" :key="item.label" class="stat-item">
        <!-- ✅ Хайлайты через <em> в шаблоне, не HTML в JSON -->
        <div class="snum">{{ item.pre }}<em>{{ item.em }}</em>{{ item.post }}</div>
        <div class="sdesc">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import {useGsap} from "@/util.ts";

gsap.registerPlugin(ScrollTrigger)

const statsEl = ref(null)
const {init, cleanup} = useGsap(statsEl)

onMounted(() => {
  init(() => {
    gsap.from('.stat-item', {
      opacity: 0,
      y: 22,
      stagger: .09,
      duration: .6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: statsEl.value,
        start: 'top 82%',
        once: true,
      }
    })
  })
})

onUnmounted(cleanup)
</script>

<style scoped lang="scss">
#stats {
  padding: 3.5rem 6%;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: var(--bg2);
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 1.5rem;
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
}

.snum {
  font-family: var(--font2);
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: -.05em;
  line-height: 1;
  color: var(--text);

  em { font-style: normal; color: var(--accent); }
}

.sdesc {
  font-size: .82rem;
  color: var(--muted);
  margin-top: 5px;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .stats-row {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .stats-row > *:last-child {
    grid-column: 1 / -1;
    justify-self: center;
  }

  .snum { font-size: 2.1rem; }
}</style>
