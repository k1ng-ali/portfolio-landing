<template>
  <footer>
    <div class="foot-in wrap">
      <div class="foot-copy">© {{ year }} {{ $t('footer.copy') }}</div>

      <div class="socials">
        <a
            v-for="soc in config.socials"
            :key="soc.label"
            :href="soc.href"
            :title="soc.label"
            class="soc"
            target="_blank"
            rel="noopener"
        >{{ soc.icon }}</a>
      </div>

      <!-- email тоже из config, не из i18n -->
      <a :href="`mailto:${config.email}`" class="foot-email">{{ config.email }}</a>
    </div>
  </footer>
</template>

<script setup>
import config from '@/config.json'

const year = new Date().getFullYear()
</script>

<style scoped lang="scss">
footer { padding: 2.5rem 6%; border-top: 1px solid var(--border); background: var(--bg); }
.foot-in { display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
.foot-copy { color: var(--muted); font-size: .82rem; }
.socials { display: flex; gap: .65rem; }
.soc {
  width: 36px; height: 36px; border: 1px solid var(--border); border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  text-decoration: none; color: var(--text); font-size: .9rem;
  transition: border-color .2s, background .2s, transform .2s;
  &:hover { border-color: var(--accent); background: rgba(124, 109, 250, .1); transform: translateY(-2px); }
}
.foot-email {
  color: var(--muted); font-size: .82rem; text-decoration: none; transition: color .2s;
  &:hover { color: var(--text); }
}
@media (max-width: 600px) { .foot-in { flex-direction: column; text-align: center; gap: 1rem; } }
</style>
