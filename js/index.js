/* ------------------------------------- */
// バニラJS
/* ------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
	/* --- 要素の取得 --- */
	const header = document.getElementById('header');
	const headerLogo = document.querySelector('.header__logo');
	const pageTopBtn = document.getElementById('page-top');
	const banner = document.getElementById('banner');
	const stopMarker = document.getElementById('banner-stop'); // 止まる場所の箱

	/* ------------------------------------- */
	// スクロール連動イベント（ヘッダー・ボタン・バナー）
	/* ------------------------------------- */
	window.addEventListener('scroll', function () {
		const scrollY = window.scrollY;
		const windowHeight = window.innerHeight;
		const headerH = header ? header.offsetHeight : 100;

		// A. ヘッダーの背景（10px以上で変化）
		const isScrolled = scrollY > 10;
		if (header) header.classList.toggle('is-scrolled', isScrolled);
		if (headerLogo) headerLogo.classList.toggle('is-scrolled', isScrolled);

		// B. ボタンとバナーの表示・非表示
		// ヘッダー高さを超えたら表示
		if (scrollY > headerH) {
			if (pageTopBtn) pageTopBtn.classList.add('show');
			if (banner) banner.classList.add('show');
		} else {
			if (pageTopBtn) pageTopBtn.classList.remove('show');
			if (banner) banner.classList.remove('show');
		}

		// C. バナーの固定位置の切り替え
		if (banner && stopMarker) {
			const markerRect = stopMarker.getBoundingClientRect();
			const markerTop = markerRect.top + scrollY; // 止まる場所の開始位置

			// 画面の下端（余白20px考慮）がマーカーに到達したら
			if (scrollY + windowHeight - 20 > markerTop) {
				// 定位置（マーカーの中）に留める
				banner.style.position = 'absolute';
				banner.style.bottom = '0px';
			} else {
				// それまでは画面下（fixed）に追いかけてくる
				banner.style.position = 'fixed';
				banner.style.bottom = '0px';
			}
		}
	});

	/* ------------------------------------- */
	// ページトップへ戻るクリックイベント
	/* ------------------------------------- */
	if (pageTopBtn) {
		pageTopBtn.addEventListener('click', function (e) {
			e.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		});
	}
	/* ------------------------------------- */
	// ハンバーガーメニュー
	/* ------------------------------------- */

	const hamburger = document.getElementById('hamburger');
	const body = document.body;
	const menuText = document.querySelector('#hamburger .menu-text');
	const navLinks = document.querySelectorAll('.header__nav a');

	// メニューテキスト切り替え
	function updateMenuText() {
		if (body.classList.contains('open')) {
			menuText.textContent = 'close';
		} else {
			menuText.textContent = 'menu';
		}
	}

	// ハンバーガーボタンクリック
	if (hamburger) {
		hamburger.addEventListener('click', function () {
			body.classList.toggle('open');
			updateMenuText();
		});
	}

	// どのリンクをクリックしても、メニューが自動的に閉じる
	navLinks.forEach(function (link) {
		link.addEventListener('click', function () {
			body.classList.remove('open');
			updateMenuText();
		});
	});

	/* ------------------------------------- */
	// フッター年号自動更新
	/* ------------------------------------- */
	// new Date()：現在の日付・時刻情報を持つDateオブジェクトを作成
	// .getFullYear()：そのDateオブジェクトから「年」だけを取り出す
	document.getElementById('year').textContent = new Date().getFullYear();

	/* ------------------------------------- */
	// よくある質問のアコーディオンメニュー
	/* ------------------------------------- */

	const details = document.querySelectorAll('.js-accordion-title');

	details.forEach((item) => {
		const summary = item.querySelector('.faq__question');
		const content = item.querySelector('.js-accordion-content');

		summary.addEventListener('click', (e) => {
			e.preventDefault(); // ブラウザの標準機能をキャンセル

			const isOpen = item.classList.contains('is-open');

			if (!isOpen) {
				// --- 他の開いているアイテムを閉じる処理 ---
				details.forEach((otherItem) => {
					if (otherItem !== item && otherItem.classList.contains('is-open')) {
						const otherContent = otherItem.querySelector('.js-accordion-content');
						otherItem.classList.remove('is-open');
						otherContent.style.height = '0px';
						// アニメーション完了後にopen属性を削除
						setTimeout(() => {
							if (!otherItem.classList.contains('is-open')) otherItem.removeAttribute('open');
						}, 300);
					}
				});

				// --- クリックされたアイテムを開く ---
				item.setAttribute('open', 'true');
				item.classList.add('is-open');
				const height = content.scrollHeight;
				content.style.height = `${height}px`;
			} else {
				// --- クリックされたアイテムを閉じる ---
				item.classList.remove('is-open');
				content.style.height = '0px';

				content.addEventListener(
					'transitionend',
					() => {
						if (!item.classList.contains('is-open')) {
							item.removeAttribute('open');
						}
					},
					{ once: true }
				);
			}
		});
	});

	/* ------------------------------------- */
	// ページ内リンクへ	/* ------------------------------------- */
	const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

	smoothScrollLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			const href = this.getAttribute('href');

			// "#" だけの場合/ページトップへのリンクは除外
			if (href === '#' || href === '#top' || this.id === 'page-top') return;

			const target = document.querySelector(href);

			if (target) {
				e.preventDefault(); // デフォルトの動作をキャンセル

				// ヘッダーの高さを取得（固定ヘッダー分を差し引くため）
				const header = document.getElementById('header');
				const headerHeight = header ? header.offsetHeight : 0;

				// ターゲットの位置を取得
				const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

				// スクロール位置の計算（ヘッダー分 + 余白20pxを引く）
				const offsetPosition = targetPosition - headerHeight;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth',
				});
			}
		});
	});

	/* ------------------------------------- */
	// フェードアップ（スクロール監視）
	/* ------------------------------------- */
	const fadeUpElements = document.querySelectorAll('.js-fadeup');

	const fadeUpObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				// 要素が画面に入ったら（20%くらい見えたら）
				if (entry.isIntersecting) {
					entry.target.classList.add('is-inview');
					// 一度表示されたら監視をやめる（何度もふわふわさせない場合）
					fadeUpObserver.unobserve(entry.target);
				}
			});
		},
		{
			// 判定のしきい値：要素が何%見えたら実行するか（0.2 = 20%）
			threshold: 0.2,
			// 画面の下端からどのくらい手前で反応させるか（jQuery版の +50px に相当）
			rootMargin: '0px 0px -50px 0px',
		}
	);

	fadeUpElements.forEach((el) => {
		fadeUpObserver.observe(el);
	});
});// 全てのJSの閉じカッコ





