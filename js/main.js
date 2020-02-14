// ・スライドの「戻る」や「進む」が可能（ナビゲーション機能）
// ・スライドの総数を画面の下部にドットで示し、それぞれをクリックすることで概要のスライドを表示する（インジケーター機能）
// ・一定時間経過すると自動で次の画像を表示し、最後のスライドだった場合は最初のスライドを表示する（オートプレイ機能）
// ・マウスオーバーでスライドを停止、離れると再開（ポーズ機能）

$(function() {

  $('.slideshow').each(function () {

    var $container = $(this),
        $slideGroup = $container.find('.slideshow-slides'),
        $slides = $slideGroup.find('.slide'),
        $nav = $container.find('.slideshow-nav'),
        $indicator = $container.find('.slideshow-indicator'),

        slideCount = $slides.length,
        indicatorHTML = '',
        currentIndex = 0,
        duration = 500,
        easing = 'easeInOutExpo',
        interval = 4000,
        timer;

        //スライドの配置と、インジケーターの生成と挿入
        $slides.each(function (i) {
          $(this).css({ left: 100 * i + '%' });
          indicatorHTML += '<a href="#">' + (i + 1) + '</a>';
        });
        $indicator.html(indicatorHTML);

        //任意のスライドを表示する関数を定義する。インデックスの数字を受けたらそれに対応した画像を返すことに徹する
        function goToSlide (index) {
          $slideGroup.animate({ left: - 100 * index + '%' }, duration, easing);
          currentIndex = index;
          updateNav();
        }

        //ナビゲーションとインジケーターの状態を更新する関数を定義する
        function updateNav () {
          var $navPrev = $nav.find('.prev'),
              $navNext = $nav.find('.next');

              if (currentIndex === 0) {
                $navPrev.addClass('disabled');
              } else {
                $navPrev.removeClass('disabled');
              }

              if (currentIndex === slideCount - 1) {
                $navNext.addClass('disabled');
              } else {
                $navNext.removeClass('disabled');
              }

              //現在のスライドのインジケーターを無効にする
              $indicator.find('a').removeClass('active').eq(currentIndex).addClass('active');
        }

        //タイマーを開始する関数
        function startTimer () {
          timer = setInterval(function () {
            var nextIndex = (currentIndex + 1) % slideCount;
            goToSlide(nextIndex);
          }, interval);
        }

        //タイマーを停止する関数
        function stopTimer () {
          clearInterval(timer);
        }

        $container.on( { mouseenter: stopTimer, mouseleave: startTimer } );

        $nav.on('click', 'a', function (event) {
          event.preventDefault();
          if ($(this).hasClass('prev')) {
            goToSlide(currentIndex - 1);
          } else {
            goToSlide(currentIndex + 1);
          }
        });

        $indicator.on('click', 'a', function (event) {
          event.preventDefault();
          if (!$(this).hasClass('active')) {
            goToSlide($(this).index());
          }
        });

        goToSlide(currentIndex);

        startTimer();
  });
});