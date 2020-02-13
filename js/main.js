// ・スライドの「戻る」や「進む」が可能（ナビゲーション機能）
// ・スライドの総数を画面の下部にドットで示し、それぞれをクリックすることで概要のスライドを表示する（インジケーター機能）
// ・一定時間経過すると自動で次の画像を表示し、最後のスライドだった場合は最初のスライドを表示する（オートプレイ機能）
// ・マウスオーバーでスライドを停止、離れると再開（ポーズ機能）

$(function() {

  $('.slideshow').each(function () {

    var $container = $(this),
        $slideGroup = $container.find('.slideshow-slides'),
        $slides = $slideGroup.find('.slide'),
        $nav = $container.find('.sideshow-nav'),
        $indicator = $container.find('.slideshow-indicator'),

        slideCount = $slides.length,
        indicatorHTML = '',
        currentIndex = 0,
        duration = 500,
        easing = 'easeInOutExpo',
        interval = 7500,
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
        w
  });
});