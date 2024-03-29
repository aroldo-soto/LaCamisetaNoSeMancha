import React, { createContext, useEffect, useState, useRef } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export const AppContext = createContext();

const ConstAppContext = ({ children }) => {
  /*ABRIR & CERRAR CARRITO STATES*/

  const [abrir, setAbrir] = useState(false);

  /*ABRIR & CERRAR SEARCH STATES*/

  const [abrir2, setAbrir2] = useState(false);

  /*ABRIR & CERRAR MOBILE MENU*/

  const [OpenMenu, setOpenMenu] = useState(false);
  const [OpenMenu1, setOpenMenu1] = useState(false);
  const [OpenMenu2, setOpenMenu2] = useState(false);
  const [OpenMenu3, setOpenMenu3] = useState(false);
  const [OpenCart, setOpenCart] = useState(false);

  /*NOTIFICATION*/

  const [notificationproduct, setNotificationproduct] = useState({});

  const [abrir3, setAbrir3] = useState(false);

  const notificate = () => {
    setAbrir3(true);
    setTimeout(() => {
      setAbrir3(false);
    }, 5000);
  };

  /*NOTIFICATION-1*/

  const [abrir4, setAbrir4] = useState(false);

  const notificate1 = () => {
    setAbrir4(true);
    setTimeout(() => {
      setAbrir4(false);
    }, 4000);
  };

  /*MpOrderGenerated*/

  const [MpOrderGenerated, setMpOrderGenerated] = useState(false);

  /*ABRIR & CERRAR GUIA DE TALLES*/

  const [abrir5, setAbrir5] = useState(false);

  /*ABRIR & CERRAR MOBILE-ShippingPriceFAQ*/

  const [openShippingPriceFAQ, setopenShippingPriceFAQ] = useState(false);

  /*USESTATES DE CHECKOUTPAGE*/

  const [abrir6, setAbrir6] = useState(true);
  const [abrir7, setAbrir7] = useState(false);

  /*USESTATES DE PAYMENT METHODS*/

  const [Payment1, setPayment1] = useState(true);
  const [Payment2, setPayment2] = useState(false);

  /*SCROLL HP-S1*/

  const scollToRef = useRef();
  const MobilescollToRef = useRef();

  /*CARRITO*/

  const [productlist, setProductlist] = useState([]);

  const changeCountOfProduct = (indexProduct, sum) => {
    const copyOfProducts = [...productlist];
    const operation = sum ? +1 : -1;
    copyOfProducts[indexProduct] = {
      ...productlist[indexProduct],
      count:
        productlist[indexProduct].count > 0
          ? productlist[indexProduct].count + operation
          : productlist[indexProduct].count,
    };
    setProductlist(copyOfProducts);
  };

  const incrementCountOfProduct = (indexProduct) => {
    if (productlist[indexProduct].talle === "S") {
      if (productlist[indexProduct].count >= productlist[indexProduct].StockS) {
      } else {
        changeCountOfProduct(indexProduct, true);
      }
    } else if (productlist[indexProduct].talle === "M") {
      if (productlist[indexProduct].count >= productlist[indexProduct].StockM) {
      } else {
        changeCountOfProduct(indexProduct, true);
      }
    } else if (productlist[indexProduct].talle === "L") {
      if (productlist[indexProduct].count >= productlist[indexProduct].StockL) {
      } else {
        changeCountOfProduct(indexProduct, true);
      }
    } else if (productlist[indexProduct].talle === "XL") {
      if (
        productlist[indexProduct].count >= productlist[indexProduct].StockXL
      ) {
      } else {
        changeCountOfProduct(indexProduct, true);
      }
    } else if (productlist[indexProduct].talle === "XXL") {
      if (
        productlist[indexProduct].count >= productlist[indexProduct].StockXXL
      ) {
      } else {
        changeCountOfProduct(indexProduct, true);
      }
    }
  };

  const decrementCountOfProduct = (indexProduct) => {
    changeCountOfProduct(indexProduct, false);
  };

  const EliminarProducto = (productId) => {
    const findIndexOfProducts = productlist.findIndex(
      ({ id }) => productId === id
    );

    if (findIndexOfProducts !== -1) {
      const copyOfProducts = [...productlist];
      copyOfProducts.splice(findIndexOfProducts, 1);
      setProductlist(copyOfProducts);
    }
  };

  const AgregarProducto = (
    imagen,
    nombre,
    categoria,
    talle,
    precio,
    StockS,
    StockM,
    StockL,
    StockXL,
    StockXXL,
    id
  ) => {
    const foundProduct = productlist.find(
      (product) => (product.id === id) & (product.talle === talle)
    );
    if (!foundProduct) {
      setProductlist([
        ...productlist,
        {
          imagen,
          nombre,
          categoria,
          talle,
          precio,
          count: 1,
          StockS,
          StockM,
          StockL,
          StockXL,
          StockXXL,
          id,
        },
      ]);
    }
    setNotificationproduct({ nombre, categoria, imagen });
  };

  /*PRECIOS DE ENVÍO, SUBTOTAL, TOTAL Y TOTALpostCALCULOENVÍO*/

  const ShippingMinimum = 25000;

  const ShippingMinimumOnCurrencyFormat = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(ShippingMinimum);

  const ShippingPrice = 1360;

  const ShippingPriceOnCurrencyFormat = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(ShippingPrice);

  const SubTotalPrice = () => {
    return productlist.reduce((prev, act) => prev + act.count * act.precio, 0);
  };

  const SubtotalPriceOnCurrencyFormat = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(SubTotalPrice());

  const SubTotalPriceConstFormat = SubTotalPrice();

  const TotalOrderPrice = SubTotalPriceConstFormat + ShippingPrice;

  const TotalOrderPriceOnCurrencyFormat = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(TotalOrderPrice);

  const [
    OrderPriceAfterShippingCalculation,
    setOrderPriceAfterShippingCalculation,
  ] = useState();

  const [EnvioIncluido, setEnvioIncluido] = useState();

  useEffect(() => {
    if (SubTotalPriceConstFormat >= ShippingMinimum) {
      setOrderPriceAfterShippingCalculation(SubtotalPriceOnCurrencyFormat);
      setEnvioIncluido("Incluido");
    } else {
      setOrderPriceAfterShippingCalculation(TotalOrderPriceOnCurrencyFormat);
      setEnvioIncluido("No incluido");
    }
  }, [
    SubTotalPriceConstFormat,
    SubtotalPriceOnCurrencyFormat,
    TotalOrderPriceOnCurrencyFormat,
  ]);

  const [
    OrderPriceAfterShippingCalculationOnNumberFormat,
    setOrderPriceAfterShippingCalculationOnNumberFormat,
  ] = useState();

  useEffect(() => {
    if (SubTotalPriceConstFormat >= ShippingMinimum) {
      setOrderPriceAfterShippingCalculationOnNumberFormat(
        SubTotalPriceConstFormat
      );
    } else {
      setOrderPriceAfterShippingCalculationOnNumberFormat(TotalOrderPrice);
    }
  }, [SubTotalPriceConstFormat, TotalOrderPrice]);

  /*INPUT FORM VALUES*/

  const [EmailInput, setEmailInput] = useState("");
  const [CountryInput, setCountryInput] = useState("");
  const [NameInput, setNameInput] = useState("");
  const [SurNameInput, setSurNameInput] = useState("");
  const [CompanyInput, setCompanyInput] = useState("");
  const [AdressInput, setAdressInput] = useState("");
  const [Adress2Input, setAdress2Input] = useState("");
  const [ZipInput, setZipInput] = useState("");
  const [CityInput, setCityInput] = useState("");
  const [ProvinceInput, setProvinceInput] = useState("");
  const [PhoneInput, setPhoneInput] = useState("");

  /*PAYMENT FORM VALUES*/

  const [PaymentMethod, setPaymentMethod] = useState("");

  /*GENERAR ORDER*/

  const [orderId, setorderId] = useState();

  const orderTransferencia = {
    Comprador: {
      Email: EmailInput,
      Nombre: NameInput,
      Apellido: SurNameInput,
      Compañia: CompanyInput,
      Direccion: AdressInput,
      Direccion2: Adress2Input,
      Codigo_postal: ZipInput,
      Provincia: ProvinceInput,
      Ciudad: CityInput,
      Telefono: PhoneInput,
    },
    Productos: productlist.map((product) => ({
      Id: product.id,
      Producto: product.nombre,
      Categoria: product.categoria,
      Talle: product.talle,
      Cantidad: product.count,
      Precio: product.precio,
      Imagen_de_producto: product.imagen,
    })),
    Orden: {
      Metodo_De_Pago: PaymentMethod,
      Envio: EnvioIncluido,
      Total_En_Pesos: OrderPriceAfterShippingCalculation,
      Estado: "pendiente",
      Fecha: Date(),
    },
    RoadMap: {
      Step1: true,
      Step2: false,
      Step3: false,
      Step4: false,
    },
  };

  const GenerarOrdenTransferencia = () => {
    const db = getFirestore();
    const orderscollection = collection(db, "Orders");
    addDoc(orderscollection, orderTransferencia).then(({ id }) =>
      setorderId(id)
    );
  };

  const orderMercadoPago = {
    Comprador: {
      Email: EmailInput,
      Nombre: NameInput,
      Apellido: SurNameInput,
      Compañia: CompanyInput,
      Direccion: AdressInput,
      Direccion2: Adress2Input,
      Codigo_postal: ZipInput,
      Provincia: ProvinceInput,
      Ciudad: CityInput,
      Telefono: PhoneInput,
    },
    Productos: productlist.map((product) => ({
      Id: product.id,
      Producto: product.nombre,
      Categoria: product.categoria,
      Talle: product.talle,
      Cantidad: product.count,
      Precio: product.precio,
      Imagen_de_producto: product.imagen,
    })),
    Orden: {
      Metodo_De_Pago: "Mercado Pago",
      Envio: EnvioIncluido,
      Total_En_Pesos: OrderPriceAfterShippingCalculation,
      Fecha: Date(),
    },
    Estado: {
      Estado_De_Pago: null,
      Payment_Id: null,
    },
    RoadMap: {
      Step1: true,
      Step2: false,
      Step3: false,
      Step4: false,
    },
  };

  const GenerarOrdenMercadoPago = () => {
    const db = getFirestore();
    const orderscollection = collection(db, "Orders");
    addDoc(orderscollection, orderMercadoPago).then(({ id }) => setorderId(id));
  };

  /*GUARDAR DATA EN LOCAL & SESSION STORAGE*/

  useEffect(() => {
    const data = window.localStorage.getItem("SAVE_ON_LOCAL_STORAGE");
    if (data !== null) setProductlist(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "SAVE_ON_LOCAL_STORAGE",
      JSON.stringify(productlist)
    );
  }, [productlist]);

  useEffect(() => {
    const data = window.localStorage.getItem("SAVE_ON_LOCAL_STORAGE_ORDER_ID");
    if (data !== undefined) setorderId(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "SAVE_ON_LOCAL_STORAGE_ORDER_ID",
      JSON.stringify(orderId)
    );
  }, [orderId]);

  useEffect(() => {
    const data = window.sessionStorage.getItem(
      "SAVE_ON_SESSION_STORAGE_MP_ORDER_GENERATED"
    );
    if (data !== null) setMpOrderGenerated(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem(
      "SAVE_ON_SESSION_STORAGE_MP_ORDER_GENERATED",
      JSON.stringify(MpOrderGenerated)
    );
  }, [MpOrderGenerated]);

  /*Test*/

  useEffect(() => {
    const data = window.sessionStorage.getItem("EmailInput");
    if (data !== null) setEmailInput(JSON.parse(data));
    const data1 = window.sessionStorage.getItem("CountryInput");
    if (data1 !== null) setCountryInput(JSON.parse(data1));
    const data2 = window.sessionStorage.getItem("NameInput");
    if (data2 !== null) setNameInput(JSON.parse(data2));
    const data3 = window.sessionStorage.getItem("SurNameInput");
    if (data3 !== null) setSurNameInput(JSON.parse(data3));
    const data4 = window.sessionStorage.getItem("CompanyInput");
    if (data4 !== null) setCompanyInput(JSON.parse(data4));
    const data5 = window.sessionStorage.getItem("AdressInput");
    if (data5 !== null) setAdressInput(JSON.parse(data5));
    const data6 = window.sessionStorage.getItem("Adress2Input");
    if (data6 !== null) setAdress2Input(JSON.parse(data6));
    const data7 = window.sessionStorage.getItem("ZipInput");
    if (data7 !== null) setZipInput(JSON.parse(data7));
    const data8 = window.sessionStorage.getItem("CityInput");
    if (data8 !== null) setCityInput(JSON.parse(data8));
    const data9 = window.sessionStorage.getItem("ProvinceInput");
    if (data9 !== null) setProvinceInput(JSON.parse(data9));
    const data10 = window.sessionStorage.getItem("PhoneInput");
    if (data10 !== null) setPhoneInput(JSON.parse(data10));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("EmailInput", JSON.stringify(EmailInput));
    window.sessionStorage.setItem("CountryInput", JSON.stringify(CountryInput));
    window.sessionStorage.setItem("NameInput", JSON.stringify(NameInput));
    window.sessionStorage.setItem("SurNameInput", JSON.stringify(SurNameInput));
    window.sessionStorage.setItem("CompanyInput", JSON.stringify(CompanyInput));
    window.sessionStorage.setItem("AdressInput", JSON.stringify(AdressInput));
    window.sessionStorage.setItem("Adress2Input", JSON.stringify(Adress2Input));
    window.sessionStorage.setItem("ZipInput", JSON.stringify(ZipInput));
    window.sessionStorage.setItem("CityInput", JSON.stringify(CityInput));
    window.sessionStorage.setItem(
      "ProvinceInput",
      JSON.stringify(ProvinceInput)
    );
    window.sessionStorage.setItem("PhoneInput", JSON.stringify(PhoneInput));
  }, [
    EmailInput,
    CountryInput,
    NameInput,
    SurNameInput,
    CompanyInput,
    AdressInput,
    Adress2Input,
    ZipInput,
    CityInput,
    ProvinceInput,
    PhoneInput,
  ]);

  //LIMPIAR LOCAL STORAGE

  const CleanLocalStorage = () => {
    window.localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        AgregarProducto,
        productlist,
        setProductlist,
        abrir,
        setAbrir,
        abrir2,
        setAbrir2,
        abrir3,
        setAbrir3,
        abrir4,
        abrir5,
        setAbrir5,
        abrir6,
        setAbrir6,
        abrir7,
        setAbrir7,
        Payment1,
        setPayment1,
        Payment2,
        setPayment2,
        PaymentMethod,
        setPaymentMethod,
        notificationproduct,
        notificate,
        notificate1,
        scollToRef,
        MobilescollToRef,
        EliminarProducto,
        incrementCountOfProduct,
        decrementCountOfProduct,
        ShippingMinimum,
        ShippingMinimumOnCurrencyFormat,
        SubTotalPrice,
        SubtotalPriceOnCurrencyFormat,
        SubTotalPriceConstFormat,
        ShippingPriceOnCurrencyFormat,
        TotalOrderPriceOnCurrencyFormat,
        OrderPriceAfterShippingCalculation,
        EmailInput,
        setEmailInput,
        CountryInput,
        setCountryInput,
        NameInput,
        setNameInput,
        SurNameInput,
        setSurNameInput,
        CompanyInput,
        setCompanyInput,
        AdressInput,
        setAdressInput,
        Adress2Input,
        setAdress2Input,
        ZipInput,
        setZipInput,
        CityInput,
        setCityInput,
        ProvinceInput,
        setProvinceInput,
        PhoneInput,
        setPhoneInput,
        OrderPriceAfterShippingCalculationOnNumberFormat,
        orderId,
        GenerarOrdenTransferencia,
        GenerarOrdenMercadoPago,
        CleanLocalStorage,
        OpenMenu,
        setOpenMenu,
        OpenMenu1,
        setOpenMenu1,
        OpenMenu2,
        setOpenMenu2,
        OpenMenu3,
        setOpenMenu3,
        OpenCart,
        setOpenCart,
        openShippingPriceFAQ,
        setopenShippingPriceFAQ,
        MpOrderGenerated,
        setMpOrderGenerated,
        ShippingPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ConstAppContext;
