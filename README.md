# Gorik: jQuery fade rotator
Небольшой скрипт, в виде jQuery плагина, для быстрого переключения картинок fade эффектом. В связи с этим слайдер можно безболезненно внедрять в адаптивную вёрстку. По наведению на слайдер - он останавливается. 

Кнопки навигации вперёд/назад и блок для прямых переходов к слайду выглядят так:
```html
      <span class="rotator_nav left"><i class="icon"></i></span>
      <span class="rotator_nav right"><i class="icon"></i></span>
      <div class="rorator_move"></div>
```
Чистая разметка всего слайдера выглядит так:
```html
    <div class="class_name" id="rotatorId">
      <div class="rotator_body">
        <ul>
          <li class="slide" id="slide_1">
            <!-- content -->
          </li>
          <li class="slide" id="slide_2">
            <!-- content -->
          </li>
          <li class="slide" id="slide_3">
            <!-- content -->
          </li>
          <li class="slide" id="slide_4">
            <!-- content -->
          </li>
        </ul>
      </div>
      <span class="rotator_nav left"></span>
      <span class="rotator_nav right"></span>
      <div class="rorator_move"></div>
    </div>
```
Минимальная разметка выглядит так:
```html
    <div class="class_name" id="rotatorId">
      <div class="rotator_body">
        <ul>
          <li class="slide" id="slide_1">
            <!-- content -->
          </li>
          <li class="slide" id="slide_2">
            <!-- content -->
          </li>
          <li class="slide" id="slide_3">
            <!-- content -->
          </li>
          <li class="slide" id="slide_4">
            <!-- content -->
          </li>
        </ul>
      </div>
    </div>
```
## Подключение:
 - Подключаем библиотеку jQuery 1.10+
 - Подключаем плагин [fade.rotate.js](js/fade.rotate.js)
 - Подключаем скрипт для нужного нам элемента:
```js
$('document').ready(function(){
    $('#mainRotatorId').fadeRotate();
});
```
 - Вся разметка рисуется в HTML. Соответствено Css - тоже. Из-за эфекта Fade нет привязки к размерам слайдов.
 - Кастомные стили для слайдера есть в примере [css/styles.css](css/styles.css).

## Параметры:
**duration** - Время эфекта затухания в ms для элементов управления. Возможные значения от: _0_. Значение по умолчанию: _500_;
**autoDuration** - Время эфекта затухания в ms для автоматического режима. Возможные значения от: _0_. Значение по умолчанию: _1300_;
**startTime** - Время стартаанимации в ms впервые и после наведения мыши. Возможные значения от: _0_. Значение по умолчанию: _5000_;
**smalControls** - Отображение блока с кнопками для быстрого перехода к нужному слайду. Возможные значения: _true_ и _false_. Значение по умолчанию: _true_;
