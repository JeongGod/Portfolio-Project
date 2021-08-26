import { CONTAINER_NAME, SAS_TOKEN, STORAGE_ACCOUNT_NAME } from "constants/index";
import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';


export const uploadFileToBlob = async (file) => {
  
  if (!file) return [];
  try {
    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
      `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${SAS_TOKEN}`
    );

    // get Container - full public read access
    const containerClient = blobService.getContainerClient(CONTAINER_NAME);
    await containerClient.createIfNotExists({
      access: 'container',
    });

    // upload file
    const res = await createBlobInContainer(containerClient, file);
    console.log(res);
    return res
  } catch (error) {
    console.log(error);
  }

};

const createBlobInContainer = async (containerClient, file) => {
  try {
    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(file.name);

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };

    // upload file
    await blobClient.uploadBrowserData(file, options);

    return blobClient;
  } catch (error) {
    console.log(error);
  }
  
}