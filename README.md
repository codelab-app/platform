# Codelab.app

Checkout [Codelab.app Wiki](https://codelab-app.notion.site/991847918e6b4a7cbfb2cacd5e14e001?v=c64ddc7e78f74baaa375f336a31df0e0&pvs=4) to get started!

<!-- IAppDto is used for hydrating data, many are optional since we may not require full data all the time.

IAppModel uses ref only, this allows us partial construction of models.

IApp is serialized data, contains full data.

IAppData is for form data, while dto for models. Data usually needs to be combined with some other data to become dto

When should dto use reference id? It really only matters on frontend, since it is a data limitation. Backend we can more easily load all data at once.

Take Page/Component for example.

page -> store -> api
component -> store -> api

whether store is needed depends on the use case. api is needed only for adding data + actions.

during running, we only need the props & actions.
dd
so for dto it makes sense to have ref, since we may not need full data. the data loading depends on the use case, and id makes it partial.

for exporting data, there is a different concern. but maybe we just mirror the dto ref method so the interfaces aren't too drastically different. it really makes no difference for the export data in t†erms of interfaces, as long as all the data is there, and we have a way to re-construct it.

so it comes down to the ideal structure for constructing the frontend models.

---

Initially thought of introducing the concept of aggregate for exporting data, but in the end through didn't make sense. I need a term for representing a group of related aggregate, which bounded context made perfect sense!

---

Trying to use a different domain, mobx model vs serialized data in the modal/form causes some issue. Better to convert at last second.

---

Aggregate root boundary

App contains page/element. These are created together

Issue is that element requires page. But since we tied page to app, now element requires app. Creating a circular dep.

Should keep page separate, this way we can create a page without an app. -->
