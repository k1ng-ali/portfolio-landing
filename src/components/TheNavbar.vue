<template>
  <nav :class="{ scrolled: isScrolled }">
    <a href="#hero" class="logo">
      <span class="logo-dot"></span>{{ $t('header.logo') }}
    </a>

    <!-- Desktop nav links (hidden on mobile) -->
    <ul class="nav-links">
      <li v-for="link in links" :key="link.href">
        <a :href="link.href" :class="{ 'nav-btn': link.cta }">{{ link.label }}</a>
      </li>
    </ul>

    <div class="nav-right">
      <div class="lang-switch">
        <button
            v-for="loc in LOCALES"
            :key="loc.code"
            :class="{ active: locale === loc.code }"
            @click="setLocale(loc.code)"
        >{{ loc.label }}</button>
      </div>

      <div class="burger" :class="{ open: menuOpen }" @click="toggleMenu">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>

  <!--
    Teleport выносит оверлей прямо в <body> — он больше не является
    дочерним элементом nav и не зависит от его stacking context.
    Класс .scrolled на nav теперь никак не влияет на оверлей.
  -->
  <Teleport to="body">
    <Transition name="menu">
      <div v-if="menuOpen" class="mobile-overlay">
        <ul class="mobile-links">
          <li v-for="link in links" :key="link.href">
            <a :href="link.href" :class="{ 'nav-btn': link.cta }" @click="closeMenu">
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALES, setLocale } from '../i18n'

const { t, locale } = useI18n()

const isScrolled = ref(false)
const menuOpen   = ref(false)

const links = computed(() => [
  { href: '#about',    label: t('header.about') },
  { href: '#skills',   label: t('header.skills') },
  { href: '#projects', label: t('header.projects') },
  { href: '#process',  label: t('header.process') },
  { href: '#cta',      label: t('header.contact'), cta: true },
])

function onScroll()   { isScrolled.value = window.scrollY > 30 }
function toggleMenu() {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}
function closeMenu() {
  menuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(()   => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped lang="scss">
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 20px 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all .4s;

  &.scrolled {
    background: rgba(14, 14, 20, .8);
    backdrop-filter: blur(18px);
    box-shadow: 0 1px 0 var(--border);
  }
}

// ── Logo ──────────────────────────────────────────────────
.logo {
  font-family: var(--font2);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  letter-spacing: -.02em;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.logo-dot {
  width: 8px; height: 8px;
  background: var(--accent);
  border-radius: 50%;
}

// ── Desktop nav links ─────────────────────────────────────
.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  align-items: center;
  margin: 0; padding: 0;

  a {
    color: var(--muted);
    text-decoration: none;
    font-size: .875rem;
    font-weight: 500;
    transition: color .2s;
    position: relative;
    white-space: nowrap;

    &:not(.nav-btn)::after {
      content: '';
      position: absolute;
      bottom: -4px; left: 0; right: 0;
      height: 1px;
      background: var(--accent);
      transform: scaleX(0);
      transition: transform .25s;
      transform-origin: left;
    }

    &:not(.nav-btn):hover {
      color: var(--text);
      &::after { transform: scaleX(1); }
    }

    &.nav-btn {
      background: var(--accent);
      color: #fff !important;
      padding: 9px 22px;
      border-radius: 50px;
      font-weight: 600 !important;
      font-size: .85rem !important;
      transition: box-shadow .3s, transform .2s !important;

      &::after { display: none !important; }
      &:hover { box-shadow: 0 0 28px rgba(124, 109, 250, .55); transform: translateY(-1px); }
    }
  }
}

// ── Right group ───────────────────────────────────────────
.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

// ── Lang switch ───────────────────────────────────────────
.lang-switch {
  display: flex;
  gap: 2px;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 50px;
  padding: 3px;

  button {
    background: transparent;
    border: none;
    color: var(--muted);
    font-size: .72rem;
    font-weight: 700;
    letter-spacing: .06em;
    padding: 4px 10px;
    border-radius: 50px;
    cursor: pointer;
    transition: background .2s, color .2s;

    &.active { background: var(--accent); color: #fff; }
  }
}

// ── Burger ────────────────────────────────────────────────
.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;

  span {
    display: block;
    width: 22px; height: 2px;
    background: var(--text);
    border-radius: 2px;
    transition: .3s;
  }

  &.open {
    span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
  }
}

// ── Mobile: скрываем десктоп-ссылки ──────────────────────
@media (max-width: 800px) {
  nav { padding: 16px 5%; }
  .nav-links { display: none; }   // десктоп-список скрыт — оверлей через Teleport
  .burger    { display: flex; }
}
</style>

<!--
  Стили для Teleport-оверлея НЕ scoped — они живут вне nav,
  поэтому scoped hash сюда не подходит.
-->
<style lang="scss">
// ── Mobile overlay (teleported to <body>) ─────────────────
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;          // выше nav (100) — теперь это работает, т.к. нет родительского stacking context
  background: rgba(10, 10, 16, .97);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-links {
  list-style: none;
  margin: 0; padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  a {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text);
    text-decoration: none;
    transition: color .2s;

    &:hover { color: var(--accent2); }

    &.nav-btn {
      background: var(--accent);
      color: #fff !important;
      padding: 12px 28px;
      border-radius: 50px;
      font-size: 1.1rem !important;
    }
  }
}

// ── Transition ────────────────────────────────────────────
.menu-enter-active,
.menu-leave-active { transition: opacity .25s ease; }

.menu-enter-from,
.menu-leave-to { opacity: 0; }
</style>
