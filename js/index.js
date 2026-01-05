/* ------------------------------------- */
/* ------------------------------------- */
// バニラJS
/* ------------------------------------- */
/* ------------------------------------- */


/* ------------------------------------- */
// ハンバーガーメニュー 
/* ------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
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
	const header = document.getElementById('header');
	const headerHeight = header.offsetHeight;

	window.addEventListener('scroll', function () {
		const scrollY = window.scrollY;

		if (scrollY > headerHeight) {
			pageTopBtn.classList.add('show');
		} else {
			pageTopBtn.classList.remove('show');
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

	const Banner = document.getElementById('banner');

	window.addEventListener('scroll', function () {
		const scrollY = window.scrollY;

		if (scrollY > headerHeight) {
			Banner.classList.add('show');
		} else {
			Banner.classList.remove('show');
		}
	});

	/* ------------------------------------- */
	// ヘッダースクロール
	/* ------------------------------------- */

	window.addEventListener('scroll', () => {
		const header = document.getElementById('header');
		if (window.scrollY > 10) {
			header.classList.add('is-scrolled');
		} else {
			header.classList.remove('is-scrolled');
		}
	});

	// ↓全てのJSの閉じカッコ
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


