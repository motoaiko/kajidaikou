/* ------------------------------------- */
// バニラJS
/* ------------------------------------- */
// ページが全部読み込まれたら開始
document.addEventListener('DOMContentLoaded', () => {
	/* --- 要素の取得 --- */
	const header = document.getElementById('header');
	const headerLogo = document.querySelector('.header__logo');
	const pageTopBtn = document.getElementById('page-top');
	const banner = document.getElementById('banner');
	const stopMarker = document.getElementById('banner-stop');

	/* ------------------------------------- */
	// スクロール連動イベント（ヘッダー・ボタン・バナー）
	/* ------------------------------------- */
	window.addEventListener('scroll', function () {
		const scrollY = window.scrollY; //今、上から何ピクセル目にいるか
		const windowHeight = window.innerHeight; // 今見えている画面の縦の長さを出す
		const headerH = header ? header.offsetHeight : 100; // ヘッダーの厚さを測る

		// A. ヘッダーの背景（10px以上で変化）
		const isScrolled = scrollY > 10; // 10ピクセル以上スクロールしたか確認
		if (header) header.classList.toggle('is-scrolled', isScrolled); // 10以上ならis-scrolledクラスをつける
		if (headerLogo) headerLogo.classList.toggle('is-scrolled', isScrolled); // ロゴも一緒にis-scrolledクラスをつける

		// B. ボタンとバナーの表示・非表示
		// ヘッダー高さを超えたら表示
		if (scrollY > headerH) {
			// ヘッダーの厚さより下にいったら
			if (pageTopBtn) pageTopBtn.classList.add('show'); // 「上に戻るボタン」を出す
			if (banner) banner.classList.add('show'); // 「バナー」を出す
		} else {
			if (pageTopBtn) pageTopBtn.classList.remove('show'); // ボタンを隠す
			if (banner) banner.classList.remove('show'); // バナーを隠す
		}

		// C. バナーの固定位置の切り替え
		if (banner && stopMarker) {
			// 両方の要素があるときだけ実行
			const markerRect = stopMarker.getBoundingClientRect(); // 「止まる箱」の今の位置を調べる
			const markerTop = markerRect.top + scrollY; // 止まる場所の開始位置

			if (scrollY + windowHeight - 20 > markerTop) {
				// 画面の底が「止まる箱」にぶつかったら
				banner.style.position = 'absolute'; // 「画面固定」をやめて「ページに貼り付け」
				banner.style.bottom = '0px'; // 箱の底にピタッとくっつける
			} else {
				// まだ箱に届いていないなら
				banner.style.position = 'fixed'; // ずっと「画面の下」についてくる設定
				banner.style.bottom = '0px'; // 画面の一番下に固定
			}
		}
	});

	/* ------------------------------------- */
	// ページトップへ戻るクリックイベント
	/* ------------------------------------- */
	if (pageTopBtn) {
		pageTopBtn.addEventListener('click', function (e) {
			// ボタンが押されたら
			e.preventDefault();
			window.scrollTo({
				//.scrollTo=移動を指示するmethod
				top: 0,
				behavior: 'smooth',
			}); // smoothに一番上top: 0まで戻す
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
		// メニューの中のリンクを1つずつチェック
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
		// detailsに対して1つずつ処理を実行
		//item：今処理しているdetails要素(質問と答え全体)

		const summary = item.querySelector('.faq__question');
		const content = item.querySelector('.js-accordion-content'); //itemの中から、「クリックする場所（summary）」と「中身の回答（content）」を探し出す

		summary.addEventListener('click', (e) => {
			// 質問がクリックされたら
			e.preventDefault(); // ブラウザの標準機能をキャンセル

			const isOpen = item.classList.contains('is-open'); // itemにis-openのclassが付いているかチェックして結果をisOpenに入れる

			if (!isOpen) {
				// もしisOpenが！（＝false（閉じている状態））なら
				details.forEach((otherItem) => {
					// 他の開いてる質問otherItemを探す
					if (otherItem !== item && otherItem.classList.contains('is-open')) {
						// 今処理しているitemではないもの(otherItem !== item)、かつis-openクラスが付いているものを見つけたら(otherItem.classList.contains('is-open'))
						//!==/ノットイコール/〜ではない
						//&&/アンド/なおかつ
						const otherContent = otherItem.querySelector('.js-accordion-content');
						//otherItemのcontent部分をotherContentに入れる
						otherItem.classList.remove('is-open'); // otherItemを閉じる（is-openクラスを外す）
						otherContent.style.height = '0px'; // 高さを0にする

						// 念押しの確認:
						setTimeout(() => {
							//0.3秒待ってから下記を実行
							if (!otherItem.classList.contains('is-open'))
								// 他のアイテムにis-openが付いてないなら
								otherItem.removeAttribute('open');
							// otherItemのopen属性を削除する＝「完全に閉じた」という状態にする。
						}, 300);
					}
				});

				// --- もしisOpenが閉じているなら→クリックされたアイテムを開く ---
				item.setAttribute('open', 'true');
				item.classList.add('is-open');

				const height = content.scrollHeight; // contentの中身の高さを取得
				content.style.height = `${height}px`; // contentの高さを中身の高さ(px)にセット
			} else {
				// --- もしisOpenが開いていたら→クリックされたアイテムを閉じる ---
				item.classList.remove('is-open');
				content.style.height = '0px'; // 高さを0にする

				content.addEventListener(
					'transitionend', // contentのアニメーション（transition）が終わったら実行
					() => {
						if (!item.classList.contains('is-open')) {
							// アイテムにis-openが付いてないなら
							item.removeAttribute('open'); // itemのopen属性を削除する＝「完全に閉じた」という状態にする。
						}
					},
					{ once: true } // 一度だけ実行する
				);
			}
		});
	});

	/* ------------------------------------- */
	// ページ内リンクへ	/* ------------------------------------- */
	const smoothScrollLinks = document.querySelectorAll('a[href^="#"]'); // href属性が#で始まる全てのリンクaを取得

	smoothScrollLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			const href = this.getAttribute('href');

			// "#" だけの場合やページトップへのリンクは除外
			if (href === '#' || href === '#top' || this.id === 'page-top') return;

			const target = document.querySelector(href);

			if (target) {
				e.preventDefault(); // デフォルトの動作をキャンセル

				// id=headerを取得
				const header = document.getElementById('header');
				const headerHeight = header ? header.offsetHeight : 0; // headerはある？あればヘッダーの高さを測る、なければ0を代入
				// 三項演算子: 条件 ? 正解のとき : ハズレのとき;

				// ターゲットの位置を取得
				const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
				// 「今見えている画面の枠」から見た目的地の距離 + 今のスクロール位置 = ドキュメント全体の上から見た目的地の位置
				const offsetPosition = targetPosition - headerHeight; // スクロール位置の計算（目的地の位置からヘッダー分を引く）

				window.scrollTo({
					//.scrollTo=移動を指示するmethod
					top: offsetPosition, // ヘッダー分を引いた位置=offsetPositionまでスクロール
					behavior: 'smooth',
				});
			}
		});
	});

	/* ------------------------------------- */
	// フェードアップ/画面の底から50px以上、かつ本体の20%以上見えたら、.is-inview をつける
	/* ------------------------------------- */
	const fadeUpElements = document.querySelectorAll('.js-fadeup'); //クラス名 .js-fadeup がついている要素をすべて探し出し、「監視リスト」に登録

	const fadeUpObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				// 要素が画面に入ったら
				if (entry.isIntersecting) {
					entry.target.classList.add('is-inview');
					fadeUpObserver.unobserve(entry.target);
				}
			});
		},
		{
			// 要素が0.2 = 20%見えたら実行する
			threshold: 0.2,
			// 画面の下端から-50pxで反応させる
			rootMargin: '0px 0px -50px 0px',
		}
	);

	fadeUpElements.forEach((el) => {
		fadeUpObserver.observe(el);
	});
}); // 全てのJSの閉じカッコ
