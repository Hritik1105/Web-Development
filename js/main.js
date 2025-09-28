(function(){
	const docEl = document.documentElement;
	const navToggle = document.querySelector('.nav-toggle');
	const nav = document.getElementById('primary-nav');
	const themeToggle = document.querySelector('.theme-toggle');
	const yearEl = document.getElementById('year');

	// Year
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// Theme persistence
	const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
	if (savedTheme === 'light') docEl.classList.add('light');

	function toggleTheme(){
		docEl.classList.toggle('light');
		localStorage.setItem('theme', docEl.classList.contains('light') ? 'light' : 'dark');
	}
	if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

	// Mobile nav toggle
	function closeNav(){
		nav.classList.remove('open');
		navToggle.setAttribute('aria-expanded','false');
	}
	function openNav(){
		nav.classList.add('open');
		navToggle.setAttribute('aria-expanded','true');
	}
	if (navToggle && nav){
		navToggle.addEventListener('click', () => {
			const isOpen = nav.classList.contains('open');
			isOpen ? closeNav() : openNav();
		});
		// Close on link click
		nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
	}

	// Smooth scroll
	document.querySelectorAll('a[href^="#"]').forEach(link => {
		link.addEventListener('click', (e) => {
			const id = link.getAttribute('href');
			if (!id || id === '#') return;
			const target = document.querySelector(id);
			if (!target) return;
			e.preventDefault();
			target.scrollIntoView({ behavior:'smooth', block:'start' });
		});
	});

	// Scrollspy
	const sections = Array.from(document.querySelectorAll('main .section'));
	const navLinks = Array.from(document.querySelectorAll('#primary-nav a[href^="#"]'));
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting){
				const id = '#' + entry.target.id;
				navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
			}
		});
	},{ rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
	sections.forEach(section => observer.observe(section));
})();
