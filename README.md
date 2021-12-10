## Routing with React Router DOM 4.3.1
*Пример использования на основе работоспособного React приложения*

[Простой туториал React Router v4](https://habr.com/ru/post/329996/) и [Сложные примеры](https://reactdev.ru/libs/react-router/)

**Ниже поэтапное внедрение роутинга в приложение**

Принцип действия Router DOM довольно прост.
Различные сущности генерируют различные пути, эти пути отображаются в адресной строке.  
Специальные компоненты Router DOM отслеживают адресную строку и если путь совпадёт с 
назначенным им - предпримут заданные действия.

Импорт компонента в *./src/index.js*
```js
import {BrowserRouter} from 'react-router-dom'
```
```js
// Обёртывание в компонент
  <BrowserRouter>
    <App />
  </BrowserRouter>
```
Импорт компонента в *./src/App.js*
```js
import {Route} from 'react-router-dom'
```
```js
//Вывод заголовка при переходе по ссылке
<Route path="/" exact render={() => <h1>Home Page</h1>} />
// Вывод компонента при переходе по ссылке
<Route path="/cars" component={Cars} />
```
Импорт компонента NavLink в *./src/App.js*
```js
import {Route, NavLink} from 'react-router-dom'
```
<NavLink to=  подменяет собой <a href=...
```js
<NavLink to="/cars">Cars</NavLink>
```
После импорта и применения этих компонентов Router DOM переход
по ссылкам пересаёт перезагружать страницу. Рендеринг страницы
становится динамическим. И это хорошо :blush:   

Ссылка в HTML выглядит по-прежнему. У активной ссылки появляется класс .active
```HTML
<a href="/cars" class="active" aria-current="page">Cars</a>
```
В файле App.scss добавим стиль для активной ссылки
```SCSS
      a.active {
        font-weight: bold;
        color: red;
      }
```
Без применения параметра exact пути с одинаковым доменом будут 
считаться одинаковыми и класс .active будет применяться более чем
к одной ссылке.
```js
<NavLink to="/cars" exact>Cars</NavLink>

// А так можно задасть специфический класс активной ссылки
<NavLink to="/cars" exact activeClassName={'wfm-active'}>Cars</NavLink>
```
Инлайн задание стиля для активной ссылки
```js
 <NavLink to="/about" exact
          activeStyle={ {color: 'blue'} }
                            >About</NavLink>
```
Развёрнутое задание пути
```js
             <NavLink to={{         
                pathname: '/cars',  //  Сам путь, как и прежде
                search: '?a=1&B=2',//   Эти параметры добавляются к URL
                hash: 'wfm-hash'  //    Например для скролинга к нужному месту на странице
              }} exact>Cars</NavLink>
```

В *.\src\Cars\Cars.js* обращаемся к полю history данного компонента
и таким образом реализуем переход на заглавную страницу
```js
  goToHomePage = () => {
  this.props.history.push( {pathname: '/' } )  }
// . . .
<button onClick={this.goToHomePage}>Go to Homepage</button>
```
Функциональный компонент ./src/Cars/Car/Car.js выражен простой функцией
и не несёт в своих props полей связанных с роутингом. Но их можно
передать ему из родителя Cars посредством ...this.props  
Для тех же целей есть специальный компонент Router DOM - withRouter 
Импортируем и оборачиваем в него.
Благодаря этому у компоненра появляются нужные для роутинга поля.
```js
import {withRouter} from 'react-router-dom'
export default withRouter(Car)
```
Добавляем генерацию адресной строки в компонент Car
Теперь каждый экземпляр карточки автомобиля создаёт 
определённый путь.
```js
  <div className={'Car'}
      onClick={()=> props.history.push('/cars/' + props.name.toLowerCase())}
    >
```
Создадим новый компонент  *./src/CarDetail/CarDetail.js*
с простейшим выводом заголовка с названием автомобиля
```js
<h1>{this.props.match.params.name}</h1>
```
В App.js импортируем новый компонент и настроим маршрут. 
Вот таким вот образом через :name - это тот же name, что
и в строке выше.
```js
import CarDetail from './CarDetail/CarDetail'
<Route path="/cars/:name" exact component={CarDetail} />
```
Компонент Switch позволяет вместо exact обернуть пути в компонент
и обеспечить именно ПЕРЕКЛЮЧЕНИЕ компонентов и отменить их 
множественный вывод на страницу.
```js
import {Route, NavLink, Switch} from 'react-router-dom'
// . . .
<Switch>
  <Route path="/" . . .
  <Route path="/cars" component={Cars} />
</Switch>
```
Добавим путь к ненайденной сранице. Он должен быть последним в блоке <Switch>
```js
<Route render={()=> <h1 style={{color: 'red', textAlign: 'center'} }>404 not found!!!</h1>} />
```
То же можно делать с помощью ещё одного компонента <Redirect>
```js
// Это обычный синтаксис "отсюда -> туда"
<Redirect from={'/about'} to={'/cars'} />
// Но в компоненте <Route> можно убрать from= и тогда все дороги будут вести в to=
<Redirect to={'/'} /> // Теперь любае неправильная ссылка ведёт на Homepage
```
Добавим проверку на наличие флага isLoggedIn в state и теперь, пока
он не тру - никакого роута к about не будет, а значит будем попадать
на заглавную.
```js
{ this.state.isLoggedIn ? <Route path="/about" component={About} /> : null} 
```
Вот так просто мы можем ограничивать доступ к различным частям приложения.
Такого пути просто нет - потому что мы его не создали, потому что условие
isLoggedIn - не true