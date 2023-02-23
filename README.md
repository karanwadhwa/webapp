# webapp

CSYE 6225 Assignments
Karan Wadhwa
NUID: 002663034

## Quickstart

1. Install npm packages

```console
$ npm install
```

2. Create `.env` file from `.env.example` template
3. Install MySQL and create an empty database as defined in `.env`
4. Run setup script to initialize database tables

```console
$ npm run setup
```

5. Run unit tests

```console
$ npm run test
```

6. Start node server

```console
$ npm run start
```

### Create AMI using Packer

1. Create a zip file of the project at `/`
2. Change directory to `/src/infra`

```console
$ cd src/infra
```

3. Validate Packer file

```console
$ packer validate -var 'aws_access_key_id=<aws_access_key_id>'
    -var 'aws_secret_access_key=<aws_secret_access_key>'
    -var 'db_password=<sql db password>'
    -var 'ami_users=<ami users>'
    -var 'aws_region=<aws region where ami will be created>'
    -var 'subnet_id=<default subnet id from the specified aws region>'
    ami.pkr.hcl
```

4. Create AMI

```console
$ packer build -var 'aws_access_key_id=<aws_access_key_id>'
    -var 'aws_secret_access_key=<aws_secret_access_key>'
    -var 'db_password=<sql db password>'
    -var 'ami_users=<ami users>'
    -var 'aws_region=<aws region where ami will be created>'
    -var 'subnet_id=<default subnet id from the specified aws region>'
    ami.pkr.hcl
```
