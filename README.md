# P2-Challenge-2 (Client Side)

> Tuliskan API Docs kamu di sini

> Berikut Endpoint pada routes public dan CMS

* Public Site 

```
    1. "/" - Menampilkan home dengan card movie sebagai isinya
    2. "/detail/:id" - Menampilkan detail rating, trailer, poster, serta sinposis anime movie dari id yang diambil dari Backend

```


* CMS 

```
    1. "/login" - Menampilkan Halaman Login
    2. "/" - Menampilkan data entitas utama dalam bentuk table (Butuh Authorisasi dari Login)
    3. "/add" - Menambahakan anime movie baru (Butuh Authorisasi dari Login)
    4. "/edit/:id" - Melakukan editing pada data movie (Butuh Authorisasi dari Login)
    5. "/patch/:id" - Mengganti poster movie (Butuh Authorisasi dari Login)
    6. "/genres" - Menampilkan data entitas support dalam bentuk table (Butuh Authorisasi dari Login)
    6. "/register" - Menambahkan akun role staff (Butuh Authorisasi dari Login)
```