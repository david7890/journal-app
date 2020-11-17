import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';


//las pruebas corren en Node

cloudinary.config({ 
    cloud_name: 'dcyracwal', 
    api_key: '563541553744835', 
    api_secret: 'ivnzRNsl89Xez8IPOPYesfzbzKk' 
});

describe('Pruebas en fileUpload', () =>{
    test('debe de cargar un archivo y retornar la url', async(done) => {
        //hacer una peticion
        const resp = await fetch('https://i.imgur.com/qlEKRDi.jpeg')
        const blob = await resp.blob()
        //crear archivo
        const file = new File([blob], 'fotoPrueba.png')
        //subir imagen
        const url = await fileUpload(file)

        expect(typeof url ).toBe('string')
        
        //borrar imagen por id
        //separar el url en un arrreglo 
        const segments = url.split('/');
        //guardar nombre de la imagen que le da cloudinary
        //tomar ultima posicion del arreglo y quitar png
        const imageId = segments[segments.length -1 ].replace('.png', '')
        cloudinary.v2.api.delete_resources(imageId,{}, () => {
            done()
        });
    })
    
    test('debe de retornar un error', async() => {
        //error en archivo
        const file = new File([], 'fotoPrueba.png')
        const url = await fileUpload(file)
        
        expect( url ).toBe(null)
    })
})