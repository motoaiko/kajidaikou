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
});// 全てのJSの閉じカッコ


/* ------------------------------------- */
// フェードアップ
/* ------------------------------------- */
// $(window).on('scroll load', function () {
// 	const winTop = $(window).scrollTop();
// 	const winHeight = $(window).height();

// 	$('.js-fadeup').each(function () {
// 		const targetTop = $(this).offset().top;
// 		$(this).toggleClass('is-inview', winTop + winHeight > targetTop + 50);
// 	});
// });

// jQuery(function ($) {
// 	/* ------------------------------------- */
// 	// スライダー
// 	/* ------------------------------------- */

// 	$(function () {
// 		$('#slider')
// 			.on('init', function () {
// 				// 最初のスライドに"add-animation"のclassを付ける(data-slick-index="0"が最初のスライドを指す)
// 				$('.slick-slide[data-slick-index="0"]').addClass('add-animation');
// 			})
// 			// 通常のオプション
// 			.slick({
// 				autoplay: true, // 自動再生ON
// 				fade: true, // フェードON
// 				arrows: false, // 矢印OFF
// 				speed: 2000, // スライド、フェードアニメーションの速度2000ミリ秒
// 				autoplaySpeed: 3000, // 自動再生速度4000ミリ秒
// 				pauseOnFocus: false, // フォーカスで一時停止OFF
// 				pauseOnHover: false, // マウスホバーで一時停止OFF
// 			})
// 			.on({
// 				// スライドが移動する前に発生するイベント
// 				beforeChange: function (event, slick, currentSlide, nextSlide) {
// 					// 表示されているスライドに"add-animation"のclassをつける
// 					$('.slick-slide', this).eq(nextSlide).addClass('add-animation');
// 					// あとで"add-animation"のclassを消すための"remove-animation"classを付ける
// 					$('.slick-slide', this).eq(currentSlide).addClass('remove-animation');
// 				},
// 				// スライドが移動した後に発生するイベント
// 				afterChange: function () {
// 					// 表示していないスライドはアニメーションのclassを外す
// 					$('.remove-animation', this).removeClass('remove-animation add-animation');
// 				},
// 			});
// 	});

// 	/* ------------------------------------- */
// 	// ページ内リンクへ
// 	/* ------------------------------------- */

// 	$(function () {
// 		$('a[href^="#"]').click(function (event) {
// 			event.preventDefault();
// 			var speed = 600;
// 			var href = $(this).attr('href');
// 			var target = $(href);
// 			if (target.length) {
// 				var headerHeight = $('#header').outerHeight(); // ヘッダーの高さを取得
// 				$('html, body').animate(
// 					{
// 						scrollTop: target.offset().top - headerHeight - 20, // 余白を追加
// 					},
// 					speed,
// 					'swing'
// 				);
// 			}
// 		});
// 	});

// 	/* ------------------------------------- */
// 	// topへ戻る
// 	/* ------------------------------------- */

// 	$(function () {
// 		const $pageTopBtn = $('#page-top');
// 		const headerHeight = $('#header').outerHeight();

// 		$(window).on('scroll', function () {
// 			if ($(window).scrollTop() > headerHeight) {
// 				$pageTopBtn.addClass('show');
// 			} else {
// 				$pageTopBtn.removeClass('show');
// 			}
// 		});

// 		$pageTopBtn.on('click', function (e) {
// 			e.preventDefault();
// 			$('html, body').animate({ scrollTop: 0 }, 600);
// 		});
// 	});
// });


