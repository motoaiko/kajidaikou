/* ------------------------------------- */
/* ------------------------------------- */
// バニラJS
/* ------------------------------------- */
/* ------------------------------------- */


/* ------------------------------------- */
// ハンバーガーメニュー 
/* ------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
	const hamburger = document.getElementById('hamburger');
	const body = document.body;
	const menuText = document.querySelector('#hamburger .menu-text');
	const navLinks = document.querySelectorAll('.header__nav a');

	// メニューテキスト

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
	// トップへ戻るボタン
	/* ------------------------------------- */

	const pageTopBtn = document.getElementById('page-top');
	//header の高さを取得
	const header = document.getElementById('header');
	const headerHeight = header.offsetHeight;
	const Banner = document.getElementById('banner');

	window.addEventListener('scroll', function () {
		const scrollY = window.scrollY;

		if (scrollY > headerHeight) {
			pageTopBtn.classList.add('show');
		} else {
			pageTopBtn.classList.remove('show');
		}

		if (scrollY > headerHeight) {
			Banner.classList.add('show');
		} else {
			Banner.classList.remove('show');
		}

	});

	pageTopBtn.addEventListener('click', function (e) {
		e.preventDefault(); // デフォルトのリンク動作を防止
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	});
	/* ------------------------------------- */
	// バナー表示　下部固定
	/* ------------------------------------- */
	const banner = document.getElementById('banner');
	const ctaSection = document.querySelector('.cta-final');

	window.addEventListener('scroll', function () {
		const scrollY = window.scrollY;
		const ctaTop = ctaSection.getBoundingClientRect().top + window.pageYOffset;
		const windowHeight = window.innerHeight;

		// 1. 表示・非表示の切り替え（ヘッダー付近）
		if (scrollY > 200) {
			banner.classList.add('show');
		} else {
			banner.classList.remove('show');
		}

		// 2. 固定(fixed)か、セクションでの静止(absolute)かの切り替え
		// 画面の下端が cta-final セクションに到達したら
		if (scrollY + windowHeight > ctaTop + 100) {
			banner.style.position = 'absolute';
			banner.style.bottom = '-150px'; // cta-finalの底に張り付く
		} else {
			banner.style.position = 'fixed';
			banner.style.bottom = '0px'; // 画面下に浮く
		}
	});


	/* ------------------------------------- */
	// ヘッダースクロール
	/* ------------------------------------- */
	// #headerと.header__logoが10スクロールされたらis-scrolledクラスを付ける
	// if (header) →→万が一その要素がないページでもエラーが出ないように
	// classList.toggle('クラス名', 条件) と書くことで、「条件が true なら追加、false なら削除」

	window.addEventListener('scroll', () => {
		const header = document.getElementById('header');
		const headerLogo = document.querySelector('.header__logo');

		const isScrolled = window.scrollY > 10;

		if (header) {
			header.classList.toggle('is-scrolled', isScrolled);
		}

		if (headerLogo) {
			headerLogo.classList.toggle('is-scrolled', isScrolled);
		}
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
	// ↓全てのJSの閉じカッコ
});

document.addEventListener('DOMContentLoaded', () => {
});
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


