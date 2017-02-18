# Generics beans modeling
How define and manage the creation ( compliance with constraints defined by you ) of Javascript beans.
Pass an litteral object to factory and get a robust and light bean. You can ensure consistency between back and front model.
Makes difference.

```js
//This is an example of call from an Factory AngularJS
var _requestOptions = {
    method: 'GET',
    url: "http://myendpoint.com/client/5"
  };

$http(_requestOptions).then(function (response) {
  return neogenz.beans.factory.getBean('Client', response.data);
});
```

## Installation
```bash
$ npm install generics-js-beans-builder
```

## Features
  * Factory pattern provided to build all beans
  * Control structures of each beans
  * Be sure to your beans manipulation
  * Have an description of business model from your front application
  * Preserve coherence between frontend and backend (or every datasource)
  * Clear message when datasource is not valid
  * Works even with inheritance and embedded bean

## Quick Start
The quickest way to get started with this lib.

After installation, link script in your HTML page :
```html
<script src="../underscore/undescore-min.js"></script>
<script src="./generics-js-beans-builder/BaseClass.js"></script>
<script src="./generics-js-beans-builder/AbstractBean.js"></script>
<script src="./generics-js-beans-builder/AbstractSchema.js"></script>
<script src="./generics-js-beans-builder/AbstractFactory.js"></script>
<script src="./generics-js-beans-builder/init.js"></script>

<script src="./generics-js-beans-builder/utilities/Utilities.js"></script>
<script src="./generics-js-beans-builder/utilities/Logger.js"></script>
```

### Describe your model schema
```javascript
  var Client = neogenz.beans.AbstractBean.extend({
    initialize: function () {
      neogenz.beans.AbstractBean.prototype.initialize.apply(this, arguments);
      this.id = null;
      this.lastName = null;
      this.firstName = null;
      this.birthDate = null;
      this._schema = {
        id: new neogenz.beans.AbstractSchema({
          type: neogenz.beans.type.NUMBER,
          persistingName: '_id'
        }),
        lastName: new neogenz.beans.AbstractSchema({
          type: neogenz.beans.type.STRING
        }),
        firstName: new neogenz.beans.AbstractSchema({
          type: neogenz.beans.type.STRING
        }),
        birthDate: new neogenz.beans.AbstractSchema({
          type: neogenz.beans.type.DATE
        })
      };
    }
  });

  window.Client = Client;
```
### Register your bean in factory
```javascript
  neogenz.beans.factory.registerBean('Client', window.Client);
```

### Build an instance of your bean

```javascript
//clientDataFromWS is an JSON getted from ws for example ...
var clientJsonFromWS = {
  _id: 3,
  lastName: 'Steve',
  firstName: 'Heros',
  birthDate: '2017-02-17'
}
neogenz.beans.factory.getBean('Client', clientJsonFromWS);

delete clientJsonFromWS.lastName;
clientJsonFromWS.firstName = 34;

neogenz.beans.factory.getBean('Client', clientJsonFromWS);
//Throws : Client.firstName must be of string type
//Throws : Client.lastName is mandatory property
```

## Factory options
This factory provide two methods :
```javascript
/**
 * @name _registerBean
 * Register constructor function in scoped object with bean name like key.
 * @param {string} type Bean name.
 * @param {Object} Bean Constructor-function-object which is stocked.
 */
function _registerBean(type, Bean){/*...*/}


/**
 * @name _getBean
 * Gets the bean by type in the closed object and return him by constructor calling.
 * @param {string} type Bean name.
 * @param {Object} initializationObject Object passed to bean constructor.
 */
function _getBean(type, initializationObject){/*...*/}
```



## Schema options

Each key properties of bean is used to get value on object passed in parameters to factory. If a property key in bean is different of a property key in init object, we can specified them with parameter of schema.

### type (type: neogenz.beans.type, required)
It's a control argument. With this required argument, you can strong type your bean properties.

### beanName (type: string, optional)
This argument is used when the bean property is himself a bean type. The property would be instancied by factory call on the beanName.

### mandatory (type: bool, optional, default = true)
This argument allows a control on presence of bean property in object passed in parameter to init bean.

### persisted (type: bool, optional, default = true)
This argument is unused. He exists to future evolution.

### nullable (type: bool, optional, default = false)
This argument allows you to control null value on init object property. If nullable it's false, a detection of a null property throw an exception.

### defaultValue (type: any, optional, default = null)
This arguments is the bean is create without init object.

### contentObject (type: neogenz.beans.AbstractSchema, optional)
This arguments is used to describe embedded bean in an array for exemple. In this case, you can also describe embedded bean. It's used with `neogenz.beans.type.ARRAY_OBJECT`
Example :
```javascript
var Book = neogenz.beans.AbstractBean.extend({
  initialize: function () {
    neogenz.beans.AbstractBean.prototype.initialize.apply(this, arguments);
    this.pages = null;
    this._schema = {
      pages: new neogenz.beans.AbstractSchema({
        type: neogenz.beans.type.ARRAY_OBJECT,
        defaultValue: [],
        contentObject: new neogenz.beans.AbstractSchema({
          type: neogenz.beans.type.OBJECT,
          beanName: 'Pages' //Assuming that Pages it's a bean already registered in factory
        })
      }),
    };
  }
});
neogenz.beans.factory.registerBean('Book', Book);

//your init object received from WS :
var bookJsonReceveidFromWS = {
  pages:[
    {
      number: 1,
      content: 'Lorem ipsum'
    }
  ]
};

var book = neogenz.beans.factory.getBean('Book', bookJsonReceveidFromWS);

console.log(book.pages[0].content) //Lorem ipsum
```

### persistingName (type: neogenz.beans.AbstractSchema, optional)
This argument is used to describe an property key to use on init object, that is different than that used on bean.
Example :
```javascript
var Client = neogenz.beans.AbstractBean.extend({
  initialize: function () {
    neogenz.beans.AbstractBean.prototype.initialize.apply(this, arguments);
    this.id = null; /*The key property on object received
    from WS would be '_id' */
    this._schema = {
      id: new neogenz.beans.AbstractSchema({
        type: neogenz.beans.type.NUMBER,
        persistingName: '_id'
      }),
    };
  }
});

neogenz.beans.factory.registerBean('Client', Client);

//your init object received from WS :
var clientJsonReceveidFromWS = {
  _id: 33
};

var client = neogenz.beans.factory.getBean('Client', clientJsonReceveidFromWS);

console.log(client.id) //33
```
